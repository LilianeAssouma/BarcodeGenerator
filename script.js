
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

shareBtn.addEventListener('click',function(){
    const svgContent=new XMLSerializer().serializeToString(barcodeSvg);
    const blob=new Blob([svgContent],{type:'image/svg+xml'});
    const url=URL.createObjectURL(blob);
//web share API
    if (navigator.share) {
        navigator.share({
            title: 'Barcode',
            text: 'Check out this barcode!',
            url: url,
        })
        .then(() => console.log('Shared successfully'))
        .catch(error => console.error('Error sharing:', error));
    }
    URL.revokeObjectURL(url);
});
  });











