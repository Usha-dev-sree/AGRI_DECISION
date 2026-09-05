import sys
import os
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, KeepTogether, HRFlowable
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.pdfgen import canvas

class NumberedCanvas(canvas.Canvas):
    """
    Two-pass canvas to dynamically compute and draw page numbers and running headers.
    """
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_decorations(num_pages)
            super().showPage()
        super().save()

    def draw_page_decorations(self, page_count):
        self.saveState()
        self.setFont("Helvetica-Bold", 8)
        self.setFillColor(colors.HexColor("#475569"))
        
        # Header (Pages > 1)
        if self._pageNumber > 1:
            self.drawString(54, 11 * 72 - 36, "AgroSmart India — Dashboard Guide & UI/UX Enhancement Blueprint")
            self.setStrokeColor(colors.HexColor("#e2e8f0"))
            self.setLineWidth(0.75)
            self.line(54, 11 * 72 - 42, 8.5 * 72 - 54, 11 * 72 - 42)

        # Footer (All pages)
        self.setStrokeColor(colors.HexColor("#e2e8f0"))
        self.setLineWidth(0.75)
        self.line(54, 48, 8.5 * 72 - 54, 48)
        
        self.setFont("Helvetica", 8)
        self.drawString(54, 34, "Confidential — AgroSmart Intelligence Platform")
        page_str = f"Page {self._pageNumber} of {page_count}"
        self.drawRightString(8.5 * 72 - 54, 34, page_str)
        self.restoreState()


def create_pdf(filename="AgroSmart_Dashboard_Guide.pdf"):
    pdf_path = os.path.abspath(filename)
    doc = SimpleDocTemplate(
        pdf_path,
        pagesize=letter,
        leftMargin=54,
        rightMargin=54,
        topMargin=54,
        bottomMargin=54
    )

    styles = getSampleStyleSheet()

    # Custom styles
    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Heading1'],
        fontName='Helvetica-Bold',
        fontSize=24,
        leading=28,
        textColor=colors.HexColor("#0f5229"),
        spaceAfter=6
    )

    subtitle_style = ParagraphStyle(
        'DocSubtitle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=12,
        leading=16,
        textColor=colors.HexColor("#f59e0b"),
        spaceAfter=15
    )

    h1_style = ParagraphStyle(
        'SectionH1',
        parent=styles['Heading2'],
        fontName='Helvetica-Bold',
        fontSize=16,
        leading=20,
        textColor=colors.HexColor("#15803d"),
        spaceBefore=14,
        spaceAfter=8,
        keepWithNext=True
    )

    h2_style = ParagraphStyle(
        'SectionH2',
        parent=styles['Heading3'],
        fontName='Helvetica-Bold',
        fontSize=12,
        leading=16,
        textColor=colors.HexColor("#0f5229"),
        spaceBefore=10,
        spaceAfter=4,
        keepWithNext=True
    )

    body_style = ParagraphStyle(
        'BodyDark',
        parent=styles['BodyText'],
        fontName='Helvetica',
        fontSize=9.5,
        leading=14,
        textColor=colors.HexColor("#1e293b"),
        spaceAfter=8
    )

    bullet_style = ParagraphStyle(
        'BulletText',
        parent=body_style,
        leftIndent=12,
        bulletIndent=4,
        spaceAfter=4
    )

    callout_style = ParagraphStyle(
        'CalloutText',
        parent=body_style,
        fontName='Helvetica-Oblique',
        fontSize=9,
        leading=13,
        textColor=colors.HexColor("#0f5229")
    )

    story = []

    # Title Banner
    story.append(Paragraph("AgroSmart India Platform", title_style))
    story.append(Paragraph("Dashboard Architecture, Features & UI/UX Enhancement Blueprint", subtitle_style))
    story.append(HRFlowable(width="100%", thickness=2, color=colors.HexColor("#15803d"), spaceAfter=15))

    # Executive Overview
    story.append(Paragraph("Executive Overview", h1_style))
    overview_text = (
        "<b>AgroSmart India</b> is a zero-cost, multi-role agricultural intelligence platform designed for Indian "
        "farmers, dealers, consumers, and administrators. Powered by a Spring Boot modular monolith backend, "
        "FastAPI ML microservices, React 18 SPA, and Ollama local AI, the platform provides tailored operational "
        "dashboards for every user role."
    )
    story.append(Paragraph(overview_text, body_style))
    story.append(Spacer(1, 8))

    # SECTION 1: DASHBOARD OVERVIEW & USES
    story.append(Paragraph("1. Role-Based Dashboards & Primary Functions", h1_style))
    
    # Table summarizing the dashboards
    table_data = [
        [
            Paragraph("<b>Role</b>", body_style),
            Paragraph("<b>Primary Purpose</b>", body_style),
            Paragraph("<b>Core Features</b>", body_style)
        ],
        [
            Paragraph("<b>🧑‍🌾 Farmer</b>", body_style),
            Paragraph("Manage land, track crops, access APMC market prices & run AI yield/fertilizer models.", body_style),
            Paragraph("My Lands, My Crops, Mandi Prices, AI Predictions, Local LLM Advisor.", body_style)
        ],
        [
            Paragraph("<b>🛡️ Admin</b>", body_style),
            Paragraph("System health monitoring, user account management & aggregate platform analytics.", body_style),
            Paragraph("User Activation/Deactivation, Service Health Monitors, User Role Ratios.", body_style)
        ],
        [
            Paragraph("<b>🏪 Dealer</b>", body_style),
            Paragraph("Manage agri-input products (seeds, fertilizers), inventory values & stock alerts.", body_style),
            Paragraph("Inventory Value Tracker, Stock Alerts (&lt;20 units), Product Catalog Management.", body_style)
        ],
        [
            Paragraph("<b>🛒 Consumer</b>", body_style),
            Paragraph("Direct farm-to-consumer produce purchasing, price exploration & farmer inquiries.", body_style),
            Paragraph("Farm Direct Marketplace, Crop Search & Filter, Inquiry Logs, Quality Assurance.", body_style)
        ]
    ]

    t = Table(table_data, colWidths=[90, 200, 214])
    t.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor("#f0fdf4")),
        ('TEXTCOLOR', (0,0), (-1,0), colors.HexColor("#15803d")),
        ('BOTTOMPADDING', (0,0), (-1,-1), 6),
        ('TOPPADDING', (0,0), (-1,-1), 6),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor("#cbd5e1")),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ]))
    story.append(t)
    story.append(Spacer(1, 14))

    # Deep-dive into each dashboard
    story.append(Paragraph("1.1 Farmer Dashboard Deep-Dive", h2_style))
    story.append(Paragraph("The Farmer Dashboard serves as the central command center for agricultural decision-making:", body_style))
    story.append(Paragraph("• <b>My Lands:</b> Tracks farm plots, acreage, soil classification (Alluvial, Black, Red), and irrigation mechanisms (Drip, Canal, Borewell).", bullet_style))
    story.append(Paragraph("• <b>My Crops:</b> Logs crop lifecycles (Kharif, Rabi, Zaid), sowing/expected harvest dates, input expenses, and expected yield.", bullet_style))
    story.append(Paragraph("• <b>Market Prices:</b> Real-time APMC mandi price updates across Indian states and districts.", bullet_style))
    story.append(Paragraph("• <b>AI Predictions & Insights:</b> Scikit-learn and XGBoost ML models for crop selection, yield estimation (quintals/hectare), and NPK fertilizer dosage.", bullet_style))
    story.append(Paragraph("• <b>AI Assistant:</b> Interactive floating assistant backed by Ollama LLM for localized farming query resolution.", bullet_style))
    story.append(Spacer(1, 8))

    story.append(Paragraph("1.2 Admin Dashboard Deep-Dive", h2_style))
    story.append(Paragraph("Designed for administrative control and system observability:", body_style))
    story.append(Paragraph("• <b>Analytics Cards:</b> Total Users, Registered Lands, Crops Sown, Active User Accounts.", bullet_style))
    story.append(Paragraph("• <b>User Distribution:</b> Role proportion bars for Farmers, Dealers, Consumers, and Govt Officers.", bullet_style))
    story.append(Paragraph("• <b>System Health Monitor:</b> Real-time status flags for MySQL DB, FastAPI ML Service, and Ollama LLM.", bullet_style))
    story.append(Paragraph("• <b>User Management:</b> Activation and deactivation of user accounts with instant status toggles.", bullet_style))
    story.append(Spacer(1, 8))

    story.append(Paragraph("1.3 Dealer & Consumer Dashboards", h2_style))
    story.append(Paragraph("• <b>Dealer Dashboard:</b> Inventory cataloging for fertilizers, seeds, pesticides, and equipment with total valuation calculations and low-stock alerts.", bullet_style))
    story.append(Paragraph("• <b>Consumer Hub:</b> Direct farm produce marketplace with verified quality badges, search filters by location/crop, and direct inquiry submission logs.", bullet_style))
    story.append(Spacer(1, 14))

    # SECTION 2: ENHANCEMENT RECOMMENDATIONS
    story.append(Paragraph("2. Recommendations to Enhance Beauty & User-Friendliness", h1_style))
    story.append(Paragraph(
        "To elevate AgroSmart India into a world-class agricultural platform, we recommend implementing the "
        "following high-impact design and functional enhancements:", body_style
    ))
    story.append(Spacer(1, 6))

    # Recommendation 1: Visual Design
    story.append(Paragraph("A. Visual Aesthetics & Theme Upgrades", h2_style))
    story.append(Paragraph("• <b>Glassmorphism Refinement:</b> Expand backdrop blur (16px–24px) with subtle glowing green borders (`rgba(34, 197, 94, 0.4)`) for a premium modern feel.", bullet_style))
    story.append(Paragraph("• <b>Dark / Light Mode Toggle:</b> Implement a seamless dark mode switch tailored for nighttime usage in farming regions.", bullet_style))
    story.append(Paragraph("• <b>Dynamic Weather Animated Cards:</b> Real-time animated weather cards showing temperature, humidity, rainfall forecast, and UV index.", bullet_style))
    story.append(Spacer(1, 6))

    # Recommendation 2: UX & Accessibility
    story.append(Paragraph("B. User-Friendliness & Accessibility Enhancements", h2_style))
    story.append(Paragraph("• <b>Voice-Based Navigation (Multilingual):</b> Add voice query support in Hindi, Kannada, Tamil, and Telugu to aid farmers with varying literacy levels.", bullet_style))
    story.append(Paragraph("• <b>Interactive Data Charts (Recharts):</b> Replace static text numbers with interactive visual line/bar graphs showing price trends over 15–30 days.", bullet_style))
    story.append(Paragraph("• <b>One-Click Quick Action Bar:</b> A floating bottom navigation bar on mobile devices for quick access to AI prediction and Mandi search.", bullet_style))
    story.append(Spacer(1, 6))

    # Recommendation 3: Feature Expansions
    story.append(Paragraph("C. Feature & Functional Expansions", h2_style))
    story.append(Paragraph("• <b>Farmer Profit Margin Calculator:</b> Automatic calculation of net profit (`Total Revenue - Input Cost`) per crop season.", bullet_style))
    story.append(Paragraph("• <b>Pest & Disease Image Scanner:</b> Camera upload feature allowing farmers to snap photos of crop leaves for instant AI disease identification.", bullet_style))
    story.append(Paragraph("• <b>Dealer Bulk CSV Upload:</b> Support uploading CSV/Excel sheets for rapid product catalog updates.", bullet_style))
    story.append(Paragraph("• <b>Direct UPI Payment Gateway:</b> Enable instant direct payments between consumers and farmers via UPI / QR code integration.", bullet_style))
    story.append(Spacer(1, 10))

    # Summary Callout Box
    summary_box_data = [
        [
            Paragraph(
                "<b>💡 Key Recommendation Summary:</b><br/>"
                "By combining our current <b>ambient glassmorphic UI layout</b> with <b>interactive charts</b>, "
                "<b>voice search in regional languages</b>, and <b>profit margin calculators</b>, AgroSmart India "
                "will offer an unparalleled visual user experience for rural and urban users alike.",
                callout_style
            )
        ]
    ]
    summary_table = Table(summary_box_data, colWidths=[504])
    summary_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#f0fdf4")),
        ('BORDER', (0,0), (-1,-1), 1, colors.HexColor("#22c55e")),
        ('TOPPADDING', (0,0), (-1,-1), 10),
        ('BOTTOMPADDING', (0,0), (-1,-1), 10),
        ('LEFTPADDING', (0,0), (-1,-1), 12),
        ('RIGHTPADDING', (0,0), (-1,-1), 12),
    ]))
    story.append(summary_table)

    # Build PDF
    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"PDF successfully generated at: {pdf_path}")
    return pdf_path

if __name__ == "__main__":
    create_pdf()
