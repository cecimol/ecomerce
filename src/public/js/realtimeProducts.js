const socket = io();
socket.emit("message", "Cliente conectado");

socket.on("product_created", (product) => {
  const tbody = document.getElementById("products-table-tbody");
  const tr = tbody.insertRow();
  tr.id = `products-table-product-${product.id}`;
  const titleCell = tr.insertCell(0);
  const descriptionCell = tr.insertCell(1);
  const priceCell = tr.insertCell(2);
  const thumbnailsCell = tr.insertCell(3);
  const codeCell = tr.insertCell(4);
  const stockCell = tr.insertCell(5);
  const statusCell = tr.insertCell(6);
  const categoryCell = tr.insertCell(7);

  titleCell.className = "border";
  descriptionCell.className = "border";
  priceCell.className = "border";
  thumbnailsCell.className = "border";
  codeCell.className = "border";
  stockCell.className = "border";
  statusCell.className = "border";
  categoryCell.className = "border";

  titleCell.innerHTML = product.title;
  descriptionCell.innerHTML = product.description;
  priceCell.innerHTML = product.price;
  thumbnailsCell.innerHTML = "";
  codeCell.innerHTML = product.code;
  stockCell.innerHTML = product.stock;
  statusCell.innerHTML = product.status;
  categoryCell.innerHTML = product.category;
});

socket.on("product_deleted", (pid) => {
  const tr = document.getElementById(`products-table-product-${pid}`);
  tr.parentNode.removeChild(tr);
});
