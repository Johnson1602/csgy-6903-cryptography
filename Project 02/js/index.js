const schemeData = [{
	scheme: "DES",
	standardization: "Was a US standard",
	efficiency: "Was fast, now slower than AES",
	security: "Breakable via efficient exhaustive key-search attack",
	block: "64 bits, short for hash function uses",
	key: "56 bits (+8 parity bits)",
	type: "Feistel"
},{
	scheme: "Triple DES",
	standardization: "Based on DES which was a standard",
	efficiency: "Slower than DES and AES",
	security: "Not known to be efficiently breakable",
	block: "64 bits, short for hash function uses",
	key: "168 bits (three 56-bit DES keys)",
	type: "Feistel"
},{
	scheme: "Blowfish",
	standardization: "Intended as an alternative to the aging DES",
	efficiency: "A fast cipher that faster than AES",
	security: " Vulnerable to birthday attack",
	block: "64 bits, short for hash function uses",
	key: "32 – 448 bits",
	type: "Feistel"
},{
	scheme: "AES",
	standardization: "Current US standard",
	efficiency: "Fast enough for almost all applications(except for resource-constrained devices)",
	security: "Not known to be efficiently breakable",
	block: "128 bits, large enough for hash function uses",
	key: "128, 192, or 256 bits",
	type: "SPN"
},{
	scheme: "IDEA",
	standardization: "Proposed as a DES replacement. Patents were issued for it.",
	efficiency: "Fast enough for almost all applications(except for resource-constrained devices)",
	security: "Not known to be efficiently breakable",
	block: "64 bits, large enough for hash function uses",
	key: "128 bits",
	type: "ARX"
},{
	scheme: "SIMON",
	standardization: "Wannabe standard",
	efficiency: "Faster than AES, targeting usage on resource-constrained devices",
	security: "Breakable with large-computation attack",
	block: "Short (32) to large (128)",
	key: "64, 72, 96, 128, 144, 192 or 256 bits",
	type: "Feistel"
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