function renderPrice(price) {
  return price === 0 ? 'Free' : `$${price.toFixed(2)}`;
}

export { renderPrice };