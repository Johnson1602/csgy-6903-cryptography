const questionData = {
	scene: {
		question: "What do you want to use the scheme for?",
		answer: ["Application", "Study"],
		prompt: "I want to use the scheme for ",
		func: function (that, result) {
			// that: the clicked button (with its value: that.value)
			// result:
			if (that.value == "Application") {
				// hide button (choices)
				that.parentNode.style.display = "none"
				// show choosen result prompt
				that.parentNode.nextSibling.style.display = "block"
				creationQuestion(questionData["device"], that.value)
			} else {
				let result = document.createElement("p")
				result.innerHTML = "We recommend you choosing DES"
				main.appendChild(result)
			}
		}
	},
	device: {
		question: "What device are you planning to use?",
		answer: ["Normal Device", "Resource Constrained Device"],
		prompt: "I want to use it on ",
		func: function (that, result) {
			if (that.value == "Normal Device") {
				that.parentNode.style.display = "none"
				that.parentNode.nextSibling.style.display = "block"
				creationQuestion(questionData["feature"], that.value)
			} else {
				let result = document.createElement("p")
				result.innerHTML = "We recommend you choosing SIMON"
				main.appendChild(result)
			}
		}
	},
	feature: {
		question: "What feature(s) is(are) the most important to you?",
		answer: ["Security", "Efficiency", "Security And Efficiency"],
		prompt: "I need ",
		func: function (that, result) {
			if (that.value == "Security And Efficiency") {
				that.parentNode.style.display = "none"
				that.parentNode.nextSibling.style.display = "block"
				creationQuestion(questionData["stream"], "Both")
			} else {
				that.parentNode.style.display = "none"
				that.parentNode.nextSibling.style.display = "block"
				creationQuestion(questionData["hash"], that.value)
			}
		}
	},
	hash: {
		question: "Do you need this scheme to work as part of a hash function?",
		answer: ["YES", "NO"],
		prompt: "",
		func: function (that, result) {
			// come from feature needs security only
			if (result == "Security") {
				if (that.value == "YES") {
					let result = document.createElement("p")
					result.innerHTML = "We recommend you choosing IDEA-OFB"
					main.appendChild(result)
				} else {
					that.parentNode.style.display = "none"
					that.parentNode.nextSibling.style.display = "block"
					creationQuestion(questionData["stream"], "Security")
				}
			} else if (result == "Efficiency") {
				if (that.value == "YES") {
					let result = document.createElement("p")
					result.innerHTML = "We recommend you choosing AES-OFB"
					main.appendChild(result)
				} else {
					that.parentNode.style.display = "none"
					that.parentNode.nextSibling.style.display = "block"
					creationQuestion(questionData["stream"], "Efficiency")
				}
			} else if (result == "Both") {
				if (that.value == "YES") {
					let result = document.createElement("p")
					result.innerHTML = "We recommend you choosing AES-OFB"
					main.appendChild(result)
				} else {
					let result = document.createElement("p")
					result.innerHTML = "We recommend you choosing AES"
					main.appendChild(result)
				}
			}
		}
	},
	stream: {
		question: "Do you need this scheme to encrypt streaming data?",
		answer: ["YES", "NO"],
		prompt: "",
		func: function (that, result) {
			if (result == "Security") {
				if (that.value == "YES") {
					let result = document.createElement("p")
					result.innerHTML = "We recommend you choosing 3DES-OFB"
					main.appendChild(result)
				} else {
					that.parentNode.style.display = "none"
					that.parentNode.nextSibling.style.display = "block"
					creationQuestion(questionData["photo"], "Security")
				}
			} else if (result == "Efficiency") {
				if (that.value == "YES") {
					let result = document.createElement("p")
					result.innerHTML = "We recommend you choosing BF-OFB"
					main.appendChild(result)
				} else {
					that.parentNode.style.display = "none"
					that.parentNode.nextSibling.style.display = "block"
					creationQuestion(questionData["photo"], "Efficiency")
				}
			} else if (result == "Both") {
				if (that.value == "YES") {
					let result = document.createElement("p")
					result.innerHTML = "We recommend you choosing AES-OFB"
					main.appendChild(result)
				} else {
					that.parentNode.style.display = "none"
					that.parentNode.nextSibling.style.display = "block"
					creationQuestion(questionData["photo"], "Both")
				}
			}
		}
	},
	photo: {
		question: "Are you planning to ecrypt photo files using this scheme?",
		answer: ["YES", "NO"],
		prompt: "",
		func: function (that, result) {
			if (result == "Security") {
				if (that.value == "YES") {
					let result = document.createElement("p")
					result.innerHTML = "We recommend you choosing 3DES-CBC"
					main.appendChild(result)
				} else {
					let result = document.createElement("p")
					result.innerHTML = "We recommend you choosing 3DES"
					main.appendChild(result)
				}
			} else if (result == "Efficiency") {
				if (that.value == "YES") {
					let result = document.createElement("p")
					result.innerHTML = "We recommend you choosing BF-CBC"
					main.appendChild(result)
				} else {
					let result = document.createElement("p")
					result.innerHTML = "We recommend you choosing BF"
					main.appendChild(result)
				}
			} else if (result == "Both") {
				if (that.value == "YES") {
					let result = document.createElement("p")
					result.innerHTML = "We recommend you choosing AES-CBC"
					main.appendChild(result)
				} else {
					that.parentNode.style.display = "none"
					that.parentNode.nextSibling.style.display = "block"
					creationQuestion(questionData["hash"], "Both")
				}
			}
		}
	}
}

var currentIndex = 0

// main questions section
var main = document.querySelector(".main")

function creationQuestion(currentQuestion, result) {
	// question wrapper
	let questionWrapper = document.createElement("div")
	questionWrapper.className = "question-wrapper"
	questionWrapper.setAttribute("index", currentIndex)
	currentIndex++

	// actual question
	let h4 = document.createElement("h4")
	h4.className = "question"
	h4.innerHTML = currentQuestion.question
	questionWrapper.appendChild(h4)

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
			that = this
			this.parentNode.nextSibling.querySelector("a").innerHTML = this.value
			currentQuestion.func(that, result)
		})
		answerWrapper.appendChild(button)
	}
	questionWrapper.appendChild(answerWrapper)

	// result
	let resultWrapper = document.createElement("div")
	resultWrapper.className = "result"
	resultWrapper.style.display = "none"
	let prompt = document.createElement("span")
	prompt.innerHTML = currentQuestion.prompt
	let a = document.createElement("a")
	a.href = "javascript:void(0)"
	a.addEventListener("click", function () {
		// remove all the questions after current question
		let questions = document.querySelectorAll(".question-wrapper")
		index = Number(this.parentNode.parentNode.getAttribute("index")) + 1
		for (i = index; i < currentIndex; i++) {
			questions[i].remove()
		}
		currentIndex = index
		// hide result & show choice again
		this.parentNode.style.display = "none"
		this.parentNode.previousSibling.style.display = "block"
	})
	resultWrapper.appendChild(prompt)
	resultWrapper.appendChild(a)
	questionWrapper.appendChild(resultWrapper)

	// add new question to page
	main.appendChild(questionWrapper)
}

creationQuestion(questionData["scene"], "")
