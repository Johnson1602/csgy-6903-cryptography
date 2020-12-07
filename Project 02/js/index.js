const schemeData = [{
	scheme: "DES",
	standardization: "Was a US standard",
	efficiency: "Was fast, now slower than AES",
	security: "Breakable via efficient exhaustive key-search attack",
	block: "Short for hash function uses",
	key: "56 bits (+8 parity bits)",
	ram: "not quiet sure"
}]

const tbody = document.querySelector('tbody');

for (let i = 0; i < schemeData.length; i++) {
	let tr = document.createElement('tr');
	tbody.appendChild(tr);

	for (let k in schemeData[i]) {
		let td = document.createElement('td');
		td.innerHTML = schemeData[i][k];
		tr.appendChild(td);
	}
}