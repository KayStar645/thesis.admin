import domToPdf from 'dom-to-pdf';

const exportPDF = (element, fileName, onSuccess) => {
	const options = {
		filename: fileName,
	};

	domToPdf(element, options, () => {
		onSuccess();
	});
};

export { exportPDF };
