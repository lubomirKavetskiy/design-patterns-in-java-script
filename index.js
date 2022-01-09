const Color = Object.freeze({
  red: 'red',
  green: 'green',
});

const Size = Object.freeze({
  small: 'small',
  large: 'large',
});

class Product {
  constructor(name, color, size) {
    this.name = name;
    this.color = color;
    this.size = size;
  }
}

const apple = new Product('Apple', Color.green, Size.large);
const pear = new Product('Pear', Color.green, Size.large);
const cherry = new Product('Cherry', Color.red, Size.small);

const products = [apple, pear, cherry];

class ProductFilter {
  filterByColor(products, color) {
    return products.filter((p) => p.color === color);
  }

  filterBySize(products, size) {
    return products.filter((p) => p.size === size);
  }

  filterBySizeAndColor(products, size, color) {
    return products.filter((p) => p.size === size && p.color === color);
  }

  // state space explosion
  // 3 criteria (+weight) = 7 methods

  // OCP = open for extension, closed for modification
}

const pf = new ProductFilter();
console.log('Small products (old):');
for (let p of pf.filterBySize(products, 'size', Size.small))
  console.log(p.name);

// ↑↑↑ BEFORE

// ↓↓↓ AFTER
// general interface for a specification
class ColorSpecification {
  constructor(color) {
    this.color = color;
  }

  isSatisfied(item) {
    return item.color === this.color;
  }
}

class SizeSpecification {
  constructor(size) {
    this.size = size;
  }

  isSatisfied(item) {
    return item.size === this.size;
  }
}

class AndSpecification {
  constructor(...specs) {
    this.specs = specs;
  }

  isSatisfied(item) {
    return this.specs.every((spec) => spec.isSatisfied(item));
  }
}

class OrSpecification {
  constructor(...specs) {
    this.specs = specs;
  }

  isSatisfied(item) {
    return this.specs.some((spec) => spec.isSatisfied(item));
  }
}

class BetterFilter {
  filterMethod(items, spec) {
    return items.filter((item) => spec.isSatisfied(item));
  }
}

const bf = new BetterFilter();

console.log('Red products:');
for (let p of bf.filterMethod(products, new ColorSpecification(Color.red)))
  console.log(p.name);

console.log('Large products:');
for (let p of bf.filterMethod(products, new SizeSpecification(Size.large)))
  console.log(p.name);

const andSpec = new AndSpecification(
  new SizeSpecification(Size.large),
  new ColorSpecification(Color.green)
);
console.log('Red and Small products:');
for (let p of bf.filterMethod(products, andSpec)) console.log(p.name);

const orSpec = new OrSpecification(
  new SizeSpecification(Size.small),
  new ColorSpecification(Color.green)
);
console.log('Green or Small products:');
for (let p of bf.filterMethod(products, orSpec)) console.log(p.name);

//own implemntation
const isSatisfied = (param, targetValue) => (item) =>
  item[param] === targetValue;

const andSpecification =
  (...specs) =>
  (item) =>
    specs.every((spec) => spec(item));

const orSpecification =
  (...specs) =>
  (item) =>
    specs.some((spec) => spec(item));

const getFilteredItems = (items, spec) => items.filter((item) => spec(item));

console.log(
  'filtere by "green" color:',
  getFilteredItems(products, isSatisfied('color', Color.green))
);

console.log(
  'filtere by "small" size:',
  getFilteredItems(products, isSatisfied('size', Size.small))
);

console.log(
  'filtere by "red" color and "small" size:',
  getFilteredItems(
    products,
    andSpecification(
      isSatisfied('color', Color.red),
      isSatisfied('size', Size.small)
    )
  )
);

console.log(
  'filtere by "red" color or "large" size:',
  getFilteredItems(
    products,
    orSpecification(
      isSatisfied('color', Color.red),
      isSatisfied('size', Size.large)
    )
  )
);
