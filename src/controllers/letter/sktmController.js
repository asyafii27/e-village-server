const PDFDocument = require('pdfkit');
const fs = require('fs');

const generateTestPrintPDF = (req, res) => {
    try {
        const doc = new PDFDocument();

        const filePath = 'test-print.pdf';
        const writeStream = fs.createWriteStream(filePath);

        doc.pipe(writeStream);

        doc.fontSize(25).text('Test Print PDF', {
            align: 'center'
        });

        doc.text('This is a test print PDF generated using PDFKit.', {
            align: 'left'
        });

        doc.end();

        writeStream.on('finish', () => {
            res.download(filePath, 'test-print.pdf', (err) => {
                if (err) {
                    console.error('Error sending file:', err);
                }
                fs.unlinkSync(filePath);
            });
        });

    } catch (error) {
        console.error('Error generating PDF:', error);
        res.status(500).json({ message: 'Failed to generate PDF' });
    }
};

const generateSKTMPDF = (req, res) => {
    try {
        const doc = new PDFDocument({ margin: 50 });

        // Set proper headers for PDF download
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename="sktm-print.pdf"');

        // Pipe the PDF document directly to the response
        doc.pipe(res);

        // Header
        doc.fontSize(12)
            .text('PEMERINTAH KABUPATEN KONAWE UTARA', { align: 'center' })
            .text('KECAMATAN MOLAVE', { align: 'center' })
            .text('DESA AWILA', { align: 'center' })
            .text('Alamat: Jl. Trans Sulawesi Desa Awila, Kec Molave Kode Pos 93352', { align: 'center' })
            .moveDown(2);

        // Title
        doc.fontSize(14).text('SURAT KETERANGAN TIDAK MAMPU', { align: 'center', underline: true })
            .moveDown(1);

        // Content
        doc.fontSize(12).text('Yang bertanda tangan di bawah ini Kepala Desa Awila Kecamatan Molave Kabupaten Konawe Utara menerangkan bahwa:', { align: 'justify' })
            .moveDown(1);

        // Personal Information
        doc.font('Courier')
            .fontSize(12)
            .text('Nama                 : Amiruddin Moita')
            .text('Tempat Tanggal Lahir : Molave, 07 Januari 1969')
            .text('NIK                  : 7471090101690001')
            .text('Jenis Kelamin        : Laki-Laki')
            .text('Agama                : Islam')
            .text('Pekerjaan            : Petani')
            .text('Alamat               : Desa Awila RT.06 RW.03')
            .moveDown(1);

        // Main Body
        doc.text('Bahwa nama yang tercantum di atas adalah benar-benar berdomisili di Desa Awila, Kecamatan Molave. Sepanjang pengamatan kami dan sesuai data yang ada dalam catatan kependudukan orang tersebut diatas tergolong dalam keluarga prasejahtera (Keluarga Berpenghasilan Rendah). Surat Keterangan ini diberikan untuk melengkapi persyaratan berupa perbaikan rumah tempat tinggal.', { align: 'justify' })
            .moveDown(2);

        // Footer
        doc.text('Demikian surat keterangan ini dibuat dengan sebenarnya dan diberikan kepada yang bersangkutan untuk dapat dipergunakan sebagaimana mestinya.', { align: 'justify' })
            .moveDown(2);

        // Signature
        doc.text('Awila, 14 Agustus 2021', { align: 'right' })
            .moveDown(2)
            .text('P.J. Kepala Desa Awila', { align: 'right' })
            .moveDown(4)
            .text('RIDAYANTI, S.Tr.Keb', { align: 'right' })
            .text('NIP. 19901231 201705 2 005', { align: 'right' });

        // Finalize the PDF and end the stream
        doc.end();

    } catch (error) {
        console.error('Error generating PDF:', error);
        res.status(500).json({ message: 'Failed to generate PDF' });
    }
};

module.exports = {
    generateTestPrintPDF,
    generateSKTMPDF
};