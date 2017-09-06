package com.smartsoft.utils;

import org.apache.commons.lang3.StringUtils;
import org.apache.poi.hssf.usermodel.HSSFDateUtil;
import org.apache.poi.hssf.util.HSSFColor.HSSFColorPredefined;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.ss.util.CellUtil;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.time.ZonedDateTime;
import java.util.Date;

public class ExcelUtil {

	public final static String DATE_DEFAULT_FORMAT = "yyyy/MM/dd";

	public static void copyCell(XSSFCell srcCell, XSSFCell distCell) {
        distCell.setCellStyle(srcCell.getCellStyle());
        if (srcCell.getCellComment() != null) {
            distCell.setCellComment(srcCell.getCellComment());
        }
        CellType srcCellType = srcCell.getCellTypeEnum();
        distCell.setCellType(srcCellType);
        if (srcCellType == CellType.NUMERIC) {
            if (HSSFDateUtil.isCellDateFormatted(srcCell)) {
                distCell.setCellValue(srcCell.getDateCellValue());
            } else {
                distCell.setCellValue(srcCell.getNumericCellValue());
            }
        } else if (srcCellType == CellType.STRING) {
            distCell.setCellValue(srcCell.getRichStringCellValue());
        } else if (srcCellType == CellType.BLANK) {
            // nothing21
        } else if (srcCellType == CellType.BOOLEAN) {
            distCell.setCellValue(srcCell.getBooleanCellValue());
        } else if (srcCellType == CellType.ERROR) {
            distCell.setCellErrorValue(srcCell.getErrorCellValue());
        } else if (srcCellType == CellType.FORMULA) {
            distCell.setCellFormula(srcCell.getCellFormula());
        } else { // nothing29

        }
    }

	public static void copyCellWithoutValue(XSSFCell srcCell, XSSFCell distCell) {
        distCell.setCellStyle(srcCell.getCellStyle());
        CellType srcCellType = srcCell.getCellTypeEnum();
        distCell.setCellType(srcCellType);
    }

    public static XSSFRow getSheetRow(XSSFSheet sheet, int rowIndex) {
        XSSFRow row = sheet.getRow(rowIndex);
        return row == null ? sheet.createRow(rowIndex) : row;
    }

    public static XSSFCell getRowCell(XSSFWorkbook workbook, XSSFRow row, int rowIndex) {
	    XSSFCell cell = row.getCell(rowIndex);
	    if (cell == null) {
	        cell = row.createCell(rowIndex);
            CellStyle style = workbook.createCellStyle();
            style.setBorderBottom(BorderStyle.THIN);
            style.setBorderTop(BorderStyle.THIN);
            style.setBorderRight(BorderStyle.THIN);
            style.setBorderLeft(BorderStyle.THIN);
            style.setFillBackgroundColor(HSSFColorPredefined.WHITE.getIndex());
            cell.setCellStyle(style);
            CellUtil.setAlignment(cell, HorizontalAlignment.CENTER);
        }
	    return cell;
    }

    /**
     * 得到单元格格式
     * @param row
     * @param cellIndex
     * @return
     */
    public static CellStyle getCellStyle(XSSFRow row, int cellIndex) {
        XSSFCell cell = row.getCell(cellIndex);
        return cell.getCellStyle();
    }

    /**
     * 写入单元格值，并且设置格式
     * @param row
     * @param cellIndex
     * @param value
     * @param cellType
     * @param cellStyle
     */
    public static void setCellValue(XSSFRow row, int cellIndex, Object value, CellType cellType, CellStyle cellStyle) {

        XSSFCell cell = row.getCell(cellIndex);
        cell.setCellType(cellType);
        if(cellStyle!=null)
        	cell.setCellStyle(cellStyle);

        switch (cellType) {
	        case BLANK:
	            break;
	        case BOOLEAN:
	            cell.setCellValue((Boolean)value);
	            break;
	        case ERROR:
	        	cell.setCellErrorValue((Byte)value);
	        	break;
	        case FORMULA:
	            cell.setCellFormula((String)value);
	            break;
	        case NUMERIC:
	        	if(value instanceof Integer) {
	        		cell.setCellValue((Integer)value);
	        	}else if(value instanceof Double) {
	        		cell.setCellValue((Double)value);
	        	}else if(value instanceof ZonedDateTime) {
	        		cell.setCellValue(DateUtil.getExcelDate(Date.from(((ZonedDateTime)value).toInstant())));
	        	}else if(value instanceof Date) {
	        		cell.setCellValue((Date) value);
	        	}else if(value instanceof Long) {
	        		cell.setCellValue((Long) value);
	        	}
	            break;
	        case STRING:
	            cell.setCellValue((String)value);
	            break;
	        default:
	        	cell.setCellValue((String)value);
        }
    }

    /**
     * 写入单元格值
     * @param row
     * @param cellIndex
     * @param value
     * @param cellType
     */
    public static void setCellValue(XSSFRow row, int cellIndex, Object value, CellType cellType) {
	    	setCellValue(row, cellIndex, value, cellType,null);
    }

    /**
     * 合并单元格
     * @param sheet
     * @param firstRow
     * @param lastRow
     * @param firstCol
     * @param lastCol
     */
    public static void mergeRegion(Sheet sheet, int firstRow, int lastRow, int firstCol, int lastCol) {
    	if(firstRow==lastRow&&firstCol==lastCol)
    		return;
    	CellRangeAddress cellRangeAddress = new CellRangeAddress(firstRow, lastRow, firstCol, lastCol);
		sheet.addMergedRegion(cellRangeAddress);
    }

    /**
     * 获取单元格值
     *
     * @param cell
     * @return
     */
    public static Object getCellValue(Cell cell) {
        if (cell == null
                || (cell.getCellTypeEnum().equals(CellType.STRING) && StringUtils.isBlank(cell
                .getStringCellValue()))) {
            return null;
        }
        CellType cellType = cell.getCellTypeEnum();
        switch (cellType) {
            case BLANK:
                return null;
            case BOOLEAN:
                return cell.getBooleanCellValue();
            case ERROR:
                return cell.getErrorCellValue();
            case FORMULA:
                return cell.getNumericCellValue();
            case NUMERIC:
                return cell.getNumericCellValue();
            case STRING:
                return cell.getStringCellValue();
            default:
                return null;
        }
    }

    /**
     * 获取cell类型的文字描述
     * @param cellType
     * @return
     */
    public static String getCellTypeDesc(CellType cellType) {
        switch (cellType) {
            case BLANK:
                return "Null type";
            case BOOLEAN:
                return "Boolean type";
            case ERROR:
                return "Error type";
            case FORMULA:
                return "Formula type";
            case NUMERIC:
                return "Numeric type";
            case STRING:
                return "String type";
            default:
                return "Unknown type";
        }
    }
}
