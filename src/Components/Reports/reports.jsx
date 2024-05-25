import React from 'react';
import './reports.css';

const reports = [
  { id: 1, title: 'Audited Financial Statement of First Year (F.Y. 2077 - 78)', file: '/report.pdf' },
  { id: 2, title: 'Audited Financial Statement of Second Year (F.Y. 2078 - 79)', file: '/report.pdf' },
  { id: 3, title: 'Audited Financial Statement of Third Year (F.Y. 2079 - 80)', file: '/report.pdf' },
  { id: 4, title: 'Audited Financial Statement of Fourth Year (F.Y. 2080 - 81)', file: '/report.pdf' },
];

const ReportSection = () => {
  return (
    <section className="report-section shadow-dark">
      {reports.map((report) => (
        <div className="report-card" key={report.id}>
          <span className="report-title">{report.title}</span>
          <a href={report.file} download className="download-button">Download</a>
        </div>
      ))}
    </section>
  );
};

export default ReportSection;
