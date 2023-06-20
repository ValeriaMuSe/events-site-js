
function formatPrice(price) {
    if (price === 0) {
      return 'Free';
    } else {
      return `$${price.toFixed(2)}`;
    }
  }
  
  export default formatPrice;
  