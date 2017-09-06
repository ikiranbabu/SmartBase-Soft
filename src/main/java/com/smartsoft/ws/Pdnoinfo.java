//
// 此文件是由 JavaTM Architecture for XML Binding (JAXB) 引用实现 v2.2.11 生成的
// 请访问 <a href="http://java.sun.com/xml/jaxb">http://java.sun.com/xml/jaxb</a>
// 在重新编译源模式时, 对此文件的所有修改都将丢失。
// 生成时间: 2017.08.10 时间 05:22:24 PM CST
//


package com.smartsoft.ws;

import javax.xml.bind.annotation.*;
import javax.xml.datatype.XMLGregorianCalendar;


/**
 * <p>anonymous complex type的 Java 类。
 *
 * <p>以下模式片段指定包含在此类中的预期内容。
 *
 * <pre>
 * &lt;complexType&gt;
 *   &lt;complexContent&gt;
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *       &lt;sequence&gt;
 *         &lt;element name="WORKCENTER" type="{http://www.w3.org/2001/XMLSchema}string"/&gt;
 *         &lt;element name="WORKTEAMNAME" type="{http://www.w3.org/2001/XMLSchema}string"/&gt;
 *         &lt;element name="PDNO" type="{http://www.w3.org/2001/XMLSchema}string"/&gt;
 *         &lt;element name="PARTCODE" type="{http://www.w3.org/2001/XMLSchema}string"/&gt;
 *         &lt;element name="PARTNAME" type="{http://www.w3.org/2001/XMLSchema}string"/&gt;
 *         &lt;element name="PLANNEDSTARTDATE" type="{http://www.w3.org/2001/XMLSchema}dateTime"/&gt;
 *         &lt;element name="PLANNEDENDDATE" type="{http://www.w3.org/2001/XMLSchema}dateTime"/&gt;
 *       &lt;/sequence&gt;
 *     &lt;/restriction&gt;
 *   &lt;/complexContent&gt;
 * &lt;/complexType&gt;
 * </pre>
 *
 *
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "", propOrder = {
    "workcenter",
    "workteamname",
    "pdno",
    "partcode",
    "partname",
    "plannedstartdate",
    "plannedenddate"
})
@XmlRootElement(name = "pdnoinfo")
public class Pdnoinfo {

    @XmlElement(name = "WORKCENTER", required = true)
    protected String workcenter;
    @XmlElement(name = "WORKTEAMNAME", required = true)
    protected String workteamname;
    @XmlElement(name = "PDNO", required = true)
    protected String pdno;
    @XmlElement(name = "PARTCODE", required = true)
    protected String partcode;
    @XmlElement(name = "PARTNAME", required = true)
    protected String partname;
    @XmlElement(name = "PLANNEDSTARTDATE", required = true)
    @XmlSchemaType(name = "dateTime")
    protected XMLGregorianCalendar plannedstartdate;
    @XmlElement(name = "PLANNEDENDDATE", required = true)
    @XmlSchemaType(name = "dateTime")
    protected XMLGregorianCalendar plannedenddate;

    /**
     * 获取workcenter属性的值。
     *
     * @return
     *     possible object is
     *     {@link String }
     *
     */
    public String getWORKCENTER() {
        return workcenter;
    }

    /**
     * 设置workcenter属性的值。
     *
     * @param value
     *     allowed object is
     *     {@link String }
     *
     */
    public void setWORKCENTER(String value) {
        this.workcenter = value;
    }

    /**
     * 获取workteamname属性的值。
     *
     * @return
     *     possible object is
     *     {@link String }
     *
     */
    public String getWORKTEAMNAME() {
        return workteamname;
    }

    /**
     * 设置workteamname属性的值。
     *
     * @param value
     *     allowed object is
     *     {@link String }
     *
     */
    public void setWORKTEAMNAME(String value) {
        this.workteamname = value;
    }

    /**
     * 获取pdno属性的值。
     *
     * @return
     *     possible object is
     *     {@link String }
     *
     */
    public String getPDNO() {
        return pdno;
    }

    /**
     * 设置pdno属性的值。
     *
     * @param value
     *     allowed object is
     *     {@link String }
     *
     */
    public void setPDNO(String value) {
        this.pdno = value;
    }

    /**
     * 获取partcode属性的值。
     *
     * @return
     *     possible object is
     *     {@link String }
     *
     */
    public String getPARTCODE() {
        return partcode;
    }

    /**
     * 设置partcode属性的值。
     *
     * @param value
     *     allowed object is
     *     {@link String }
     *
     */
    public void setPARTCODE(String value) {
        this.partcode = value;
    }

    /**
     * 获取partname属性的值。
     *
     * @return
     *     possible object is
     *     {@link String }
     *
     */
    public String getPARTNAME() {
        return partname;
    }

    /**
     * 设置partname属性的值。
     *
     * @param value
     *     allowed object is
     *     {@link String }
     *
     */
    public void setPARTNAME(String value) {
        this.partname = value;
    }

    /**
     * 获取plannedstartdate属性的值。
     *
     * @return
     *     possible object is
     *     {@link XMLGregorianCalendar }
     *
     */
    public XMLGregorianCalendar getPLANNEDSTARTDATE() {
        return plannedstartdate;
    }

    /**
     * 设置plannedstartdate属性的值。
     *
     * @param value
     *     allowed object is
     *     {@link XMLGregorianCalendar }
     *
     */
    public void setPLANNEDSTARTDATE(XMLGregorianCalendar value) {
        this.plannedstartdate = value;
    }

    /**
     * 获取plannedenddate属性的值。
     *
     * @return
     *     possible object is
     *     {@link XMLGregorianCalendar }
     *
     */
    public XMLGregorianCalendar getPLANNEDENDDATE() {
        return plannedenddate;
    }

    /**
     * 设置plannedenddate属性的值。
     *
     * @param value
     *     allowed object is
     *     {@link XMLGregorianCalendar }
     *
     */
    public void setPLANNEDENDDATE(XMLGregorianCalendar value) {
        this.plannedenddate = value;
    }

}
