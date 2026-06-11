"use client";

import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PDFViewerProps {
    file: string;
    width?: number;
    className?: string;
    loading?: React.ReactNode;
}

export default function PDFViewer({ file, width, className, loading }: PDFViewerProps) {
    return (
        <Document 
            file={file} 
            loading={loading || <div className="w-full h-full bg-transparent animate-pulse" />}
            className={className}
        >
            <Page 
                pageNumber={1} 
                width={width} 
                renderTextLayer={false} 
                renderAnnotationLayer={false} 
            />
        </Document>
    );
}
