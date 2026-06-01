<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithStyles;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;
use PhpOffice\PhpSpreadsheet\Style\Color;
use PhpOffice\PhpSpreadsheet\Style\Fill;
use PhpOffice\PhpSpreadsheet\Style\Border;
use PhpOffice\PhpSpreadsheet\Style\Alignment;

class RecordsExport implements FromCollection, WithHeadings, WithStyles
{
    protected $records;
    protected $systemName;
    protected $farmName;
    protected $farmAddress;
    protected $batchName;

    public function __construct($records, $systemName = 'CocoBasil Records System', $farmName = 'Farm A', $farmAddress = '123 Farm St', $batchName = null)
    {
        $this->records = $records;
        $this->systemName = $systemName;
        $this->farmName = $farmName;
        $this->farmAddress = $farmAddress;
        $this->batchName = $batchName;
    }

    public function collection()
    {
        $totals = [
            'Batch' => 'Totals',
            'Section' => '',
            'Date' => '',
            'Pullet' => collect($this->records)->sum('pullet'),
            'Small' => collect($this->records)->sum('small'),
            'Medium' => collect($this->records)->sum('medium'),
            'Large' => collect($this->records)->sum('large'),
            'Extra Large' => collect($this->records)->sum('extra_large'),
            'Jumbo' => collect($this->records)->sum('jumbo'),
            'Broken' => collect($this->records)->sum('broken'),
            'Death' => collect($this->records)->sum('chicken_death'),
        ];

        $mappedRecords = collect($this->records)->map(function ($r) {
            return [
                'Batch' => $r['batch_name'] ?? '',
                'Section' => $r['section'] ?? '',
                'Date' => date('Y-m-d', strtotime($r['created_at'])),
                'Pullet' => $r['pullet'] ?? 0,
                'Small' => $r['small'] ?? 0,
                'Medium' => $r['medium'] ?? 0,
                'Large' => $r['large'] ?? 0,
                'Extra Large' => $r['extra_large'] ?? 0,
                'Jumbo' => $r['jumbo'] ?? 0,
                'Broken' => $r['broken'] ?? 0,
                'Death' => $r['chicken_death'] ?? 0,
            ];
        });

        return collect([$totals])->concat($mappedRecords);
    }

    public function headings(): array
    {
        $headings = [
            [$this->systemName],
            ['Farm Name:', $this->farmName],
            ['Address:', $this->farmAddress],
        ];

        if ($this->batchName) {
            $headings[] = ['Batch:', $this->batchName];
        }

        $headings[] = [''];
        $headings[] = ['Batch','Section','Date','Pullet','Small','Medium','Large','Extra Large','Jumbo','Broken','Death'];

        return $headings;
    }

    public function styles(Worksheet $sheet)
    {
        $rowIndex = 1;

        // SYSTEM NAME
        $sheet->mergeCells("A{$rowIndex}:K{$rowIndex}");
        $sheet->getStyle("A{$rowIndex}")->getFont()->setBold(true)->setSize(16)->getColor()->setARGB('FF006400'); // dark green
        $sheet->getRowDimension($rowIndex)->setRowHeight(30);
        $sheet->getStyle("A{$rowIndex}")->getAlignment()
            ->setHorizontal(Alignment::HORIZONTAL_CENTER)
            ->setVertical(Alignment::VERTICAL_CENTER)
            ->setWrapText(true);

        $rowIndex++;

        // FARM NAME
        $sheet->mergeCells("B{$rowIndex}:K{$rowIndex}");
        $sheet->getStyle("A{$rowIndex}")->getFont()->setBold(true)->setSize(12);
        $sheet->getStyle("B{$rowIndex}")->getFont()->setBold(false)->setSize(12);
        $sheet->getRowDimension($rowIndex)->setRowHeight(25);
        $sheet->getStyle("A{$rowIndex}:B{$rowIndex}")->getAlignment()
            ->setHorizontal(Alignment::HORIZONTAL_LEFT)
            ->setVertical(Alignment::VERTICAL_CENTER)
            ->setWrapText(true);

        $rowIndex++;

        // ADDRESS
        $sheet->mergeCells("B{$rowIndex}:K{$rowIndex}");
        $sheet->getStyle("A{$rowIndex}")->getFont()->setBold(true)->setSize(12);
        $sheet->getStyle("B{$rowIndex}")->getFont()->setBold(false)->setSize(12);
        $sheet->getRowDimension($rowIndex)->setRowHeight(25);
        $sheet->getStyle("A{$rowIndex}:B{$rowIndex}")->getAlignment()
            ->setHorizontal(Alignment::HORIZONTAL_LEFT)
            ->setVertical(Alignment::VERTICAL_CENTER)
            ->setWrapText(true);

        $rowIndex++;

        // BATCH NAME
        if ($this->batchName) {
            $sheet->mergeCells("B{$rowIndex}:K{$rowIndex}");
            $sheet->getStyle("A{$rowIndex}")->getFont()->setBold(true)->setSize(12);
            $sheet->getStyle("B{$rowIndex}")->getFont()->setBold(true)->setSize(12)->getColor()->setARGB('FF228B22'); // forest green
            $sheet->getRowDimension($rowIndex)->setRowHeight(25);
            $sheet->getStyle("A{$rowIndex}:B{$rowIndex}")->getAlignment()
                ->setHorizontal(Alignment::HORIZONTAL_LEFT)
                ->setVertical(Alignment::VERTICAL_CENTER)
                ->setWrapText(true);
            $rowIndex++;
        }

        $rowIndex++;

        // TABLE HEADERS
        $headerRow = $rowIndex;
        $sheet->getStyle("A{$headerRow}:K{$headerRow}")->getFont()->setBold(true)->getColor()->setARGB(Color::COLOR_WHITE);
        $sheet->getStyle("A{$headerRow}:K{$headerRow}")->getFill()
            ->setFillType(Fill::FILL_SOLID)->getStartColor()->setARGB('FF2E8B57'); // sea green
        $sheet->getStyle("A{$headerRow}:K{$headerRow}")->getBorders()->getAllBorders()->setBorderStyle(Border::BORDER_THIN);

        // TOTALS ROW
        $totalsRow = $headerRow + 1;
        $sheet->getStyle("A{$totalsRow}:K{$totalsRow}")->getFont()->setBold(true);
        $sheet->getStyle("A{$totalsRow}:K{$totalsRow}")->getFill()->setFillType(Fill::FILL_SOLID)
            ->getStartColor()->setARGB('FF98FB98'); // pale green
        $sheet->getStyle("A{$totalsRow}:K{$totalsRow}")->getAlignment()
            ->setHorizontal(Alignment::HORIZONTAL_CENTER);

        // Egg size columns color
        $sheet->getStyle("D{$headerRow}:I{$headerRow}")->getFill()->setFillType(Fill::FILL_SOLID)
            ->getStartColor()->setARGB('FF3CB371'); // medium sea green
        $sheet->getStyle("D{$totalsRow}:I{$totalsRow}")->getFill()->setFillType(Fill::FILL_SOLID)
            ->getStartColor()->setARGB('FF90EE90'); // light green

        // Alternate row colors for records
        $highestRow = $sheet->getHighestRow();
        for ($row = $totalsRow + 1; $row <= $highestRow; $row++) {
            $fillColor = ($row % 2 === 0) ? 'FFF0FFF0' : 'FFFFFFFF'; // light green vs white
            $sheet->getStyle("A{$row}:K{$row}")->getFill()->setFillType(Fill::FILL_SOLID)->getStartColor()->setARGB($fillColor);
        }

        // Auto size columns
        foreach (range('A', 'K') as $col) {
            $sheet->getColumnDimension($col)->setAutoSize(true);
        }

        // Center numeric columns
        foreach (range('D', 'K') as $col) {
            $sheet->getStyle("{$col}{$totalsRow}:{$col}{$highestRow}")
                ->getAlignment()->setHorizontal(Alignment::HORIZONTAL_CENTER);
        }

        // Borders for all data rows
        $sheet->getStyle("A{$totalsRow}:K{$highestRow}")->getBorders()->getAllBorders()->setBorderStyle(Border::BORDER_THIN);

        return [];
    }
}