
document.addEventListener('DOMContentLoaded', function() {
    const generateBtn = document.querySelector('.generateBtn');
    const downloadBtn = document.querySelector('.downloadBtn');
    const shareBtn = document.querySelector('.shareBtn');
    const userInput = document.querySelector('.userInput');
    const linecolorInput = document.querySelector('.linecolorInput');
    const backgroundColorInput = document.querySelector('.backgroundColorInput');
    const barcodeSvg = document.getElementById('barcode');
  
    generateBtn.addEventListener('click', function() {
      const barcodeText = userInput.value;
      const lineColor = linecolorInput.value;
      const backgroundColor = backgroundColorInput.value;
  
     
      barcodeSvg.innerHTML = '';
  
      // Generate the barcode
      JsBarcode(barcodeSvg, barcodeText, {
        format: 'CODE128', // You can change the barcode format here
        lineColor: lineColor,
        background: backgroundColor,
      });
      downloadBtn.style.display='block';
      shareBtn.style.display='block';
    });
  //download button
  downloadBtn.addEventListener('click',function(){
    const svgContent=new XMLSerializer().serializeToString(barcodeSvg);
    const blob=new Blob([svgContent],{type:'image/svg+xml'});
    const url=URL.createObjectURL(blob);

    const a=document.createElement('a');
    a.href=url;
    a.download='barcode.svg';
    a.click();
    URL.revokeObjectURL(url);
});

shareBtn.addEventListener('click', function () {
  const svgContent = new XMLSerializer().serializeToString(barcodeSvg);
  const blob = new Blob([svgContent], { type: 'image/svg+xml' });
  const url = URL.createObjectURL(blob);

  // Create a share menu
  const shareMenu = document.createElement('div');
  shareMenu.className = 'share-menu';

  // Create share via email option
  const emailOption = document.createElement('button');
  emailOption.textContent = 'Share via Email';
  emailOption.addEventListener('click', function () {
      const subject = 'Check out this barcode!';
      const body = `Here's the barcode: ${url}`;
      const mailtoLink = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailtoLink;
  });

  // Create print option
  const printOption = document.createElement('button');
  printOption.textContent = 'Print';
  printOption.addEventListener('click', function () {
      const printWindow = window.open('', '', 'width=600,height=600');
      printWindow.document.open();
      printWindow.document.write(`<img src="${url}" />`);
      printWindow.document.close();
      printWindow.print();
      printWindow.close();
  });

  // Append the options to the share menu
  shareMenu.appendChild(emailOption);
  shareMenu.appendChild(printOption);

  // Append the share menu to the body
  document.body.appendChild(shareMenu);

  // Remove the share menu after clicking an option
  const removeShareMenu = function () {
      document.body.removeChild(shareMenu);
  };

  emailOption.addEventListener('click', removeShareMenu);
  printOption.addEventListener('click', removeShareMenu);
});



  });











