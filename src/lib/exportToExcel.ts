import supabase from '@/supabase/config';
import * as XLSX from 'xlsx';

export async function exportSupabaseTableToExcel(tableName) {

    const { data, error } = await supabase.from(tableName).select('*');

    if (error) {
        console.error('Error fetching data:', error.message);
        return null;
    }

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const fileName = `${tableName}.xlsx`;

    // Download the Excel file
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = fileName;
    link.click();

    return blob;
}
