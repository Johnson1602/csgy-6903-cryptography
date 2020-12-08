var currentIndex = 0
const process = document.querySelector(".process")

// main questions section
const main = document.querySelector(".main")

function creationQuestion(currentQuestion, result) {
	// question wrapper
	let questionWrapper = document.createElement("div")
	questionWrapper.className = "question-wrapper"
	questionWrapper.setAttribute("index", currentIndex)
	currentIndex++

	// qhead
	let qhead = document.createElement("div")
	qhead.className = "qhead"

	// actual question h4
	let h4 = document.createElement("h4")
	h4.className = "question"
	h4.innerHTML = currentQuestion.question
	qhead.appendChild(h4)

	// result button
	let resultWrapper = document.createElement("div")
	resultWrapper.className = "result"
	let resultButton = document.createElement("button")
	let span = document.createElement("span")
	span.innerHTML = "Click to &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;change"
	resultButton.addEventListener("click", function () {
		this.parentNode.parentNode.parentNode.className = "question-wrapper"
		// remove all the questions after current question
		let questions = document.querySelectorAll(".question-wrapper")
		index = Number(this.parentNode.parentNode.parentNode.getAttribute("index")) + 1
		for (i = index; i < currentIndex; i++) {
			questions[i].remove()
		}
		currentIndex = index
		// hide result & show choice again
		this.parentNode.style.display = "none"
		this.parentNode.parentNode.nextSibling.style.display = "block"

		// current button's question's offset top
		let currentOffsetTop = this.parentNode.parentNode.parentNode.offsetTop
		// window height
		let windowHeight = window.innerHeight
		// optimal height
		let optimalHeight = Math.floor(windowHeight / 2 - 100)

		// if new question is too low in window, adjust window position
		if (currentOffsetTop < optimalHeight) {
			animate(window, 0)
		}

		// update question process
		let targetWidth = (currentIndex - 1) * 16
		updateProcess(targetWidth)

		// remove show recommendation button if exists
		if (document.querySelector(".special-btn")) {
			document.querySelector(".special-btn").remove()
		}
	})
	resultWrapper.appendChild(resultButton)
	resultWrapper.appendChild(span)
	qhead.appendChild(resultWrapper)
	questionWrapper.appendChild(qhead)

	// answer wrapper
	let answerWrapper = document.createElement("div")
	answerWrapper.className = "answer-wrapper"
	for (i = 0; i < currentQuestion.answer.length; i++) {
		button = document.createElement("button")
		button.type = "button"
		button.value = currentQuestion.answer[i]
		button.innerHTML = currentQuestion.answer[i]
		if (currentQuestion.answer[i].length > 20) {
			button.className = "long-button"
		}

		// register events for buttons
		button.addEventListener("click", function () {
			// remove show recommendation button if exists
			if (document.querySelector(".special-btn")) {
				document.querySelector(".special-btn").remove()
			}

			that = this
			this.parentNode.parentNode.className = "question-wrapper selected"
			this.parentNode.previousSibling.querySelector("button").innerHTML = this.value
			if (currentQuestion.func(that, result)) {
				// current button's question's offset top
				let currentOffsetTop = this.parentNode.parentNode.offsetTop
				// new question's offset top
				let newOffsetTop = currentOffsetTop + 90
				// window height
				let windowHeight = window.innerHeight
				// optimal height
				let optimalHeight = Math.floor(windowHeight / 2 - 100)

				// if new question is too low in window, adjust window position
				if (newOffsetTop > optimalHeight) {
					// calculate scroll distance
					let distance = Math.floor(newOffsetTop - optimalHeight)
					// let distance = Math.floor(newOffsetTop - optimalHeight) + 40
					main.style.height = windowHeight + distance - 120 + "px"
					animate(window, distance)
				}
			}
		})
		answerWrapper.appendChild(button)
	}
	questionWrapper.appendChild(answerWrapper)

	// add new question to page
	main.appendChild(questionWrapper)
}

// show recommendation
const recommend = document.querySelector(".recommend")
const mask = document.querySelector(".mask")

function resize() {
	let width = window.innerWidth;
	let height = window.innerHeight;
	recommend.style.left = width / 2 - 300 + "px";
	recommend.style.top = height / 2 - 280 + "px";
	recommend.style.display = 'block';
	mask.style.display = 'block';
}

function showResult(recScheme) {
	let best = recommend.querySelector(".best").querySelector("h2")
	best.innerHTML = recScheme[0]
	let alts = recommend.querySelector(".alt").querySelector("ul")
	if (recScheme.length > 1) {
		// clear previous result
		let lis = alts.querySelectorAll("li")
		let length = lis.length
		for (let i = 0; i < length; i++) {
			lis[i].remove()
		}

		// show alternative choice(s)
		alts.parentNode.style.display = "block"
		for (let i = 0; i < recScheme.length - 1; i++) {
			let li = document.createElement("li")
			li.innerHTML = recScheme[i + 1]
			alts.appendChild(li)
		}
	} else if (recScheme.length == 1) {
		alts.parentNode.style.display = "none"
	}
	resize()

	if (!document.querySelector(".special-btn")) {
		let a = document.createElement("a")
		a.href = "javascript:void(0)"
		a.className = "special-btn text-gradient"
		a.innerHTML = "Show<br>Recommendation"
		a.addEventListener("click", function () {
			resize()
		})
		main.appendChild(a)
	}
}

window.addEventListener("resize", function () {
	if (recommend.style.display == "block") {
		resize()
	}
})

// close recommendation tab
const closeRec = document.querySelector(".close")
closeRec.addEventListener("click", function () {
	recommend.style.display = 'none';
	mask.style.display = 'none';
})

mask.addEventListener("click", function () {
	recommend.style.display = 'none';
	mask.style.display = 'none';
})

// animation
function animate(obj, targetPosition, callback) {
	clearInterval(obj.timer);

	obj.timer = setInterval(function () {
		var offsetTop = window.pageYOffset;
		var step = (targetPosition - offsetTop) / 10;
		step = step > 0 ? Math.ceil(step) : Math.floor(step);
		if (offsetTop == targetPosition) {
			clearInterval(obj.timer);
			if (callback) {
				callback();
			}
		} else {
			window.scroll(0, offsetTop + step);
		}
	}, 10)
}

function updateProcess(targetWidth) {
	// clear previous timer
	clearInterval(process.timer);

	// set timer to update process length
	process.timer = setInterval(function () {
		var currentWidth = Number(process.style.width.split("%")[0])
		var step = (targetWidth - currentWidth) / 10;
		step = step > 0 ? Math.ceil(step) : Math.floor(step);
		if (currentWidth == targetWidth) {
			clearInterval(process.timer);
		} else {
			process.style.width = currentWidth + step + "%"
		}
	}, 10)
}

creationQuestion(questionData["scene"], "")
