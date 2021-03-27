const $mainRight = document.getElementById('main-right');
const $cardsWrapper = document.getElementById('cards-wrapper');
const $cardTpl = document.getElementById('card-frends-template');

const $pagination = document.querySelector('#pagin');

async function getResponse() {
	let response = await fetch('https://reqres.in/api/users?page&per_page=12');
	let content = await response.json();
	let arrayCards = content.data;

	const numberOfCardsPage = 3;

	const countBtnPaginator = Math.ceil(arrayCards.length / numberOfCardsPage);

	// создание пагинации
	const arrayLi = [];
	for (let i = 1; i <= countBtnPaginator; i++) {
		const li = document.createElement('li');
		li.innerHTML = i;
		$pagination.appendChild(li);
		arrayLi.push(li);
	};

	let active; // активная кнопка
	showCards(arrayLi[0]);

	arrayLi.forEach(function (handlePaginator) {
		handlePaginator.addEventListener('click', function () {
			showCards(this);
		});
	});

	function showCards(btnPaginator) {
		if (active) {
			active.classList.remove('active');
		}
		active = btnPaginator;
		btnPaginator.classList.add('active');

		const btnNum = +btnPaginator.innerHTML;

		const start = (btnNum - 1) * numberOfCardsPage;
		const end = start + numberOfCardsPage;
		const notesCards = arrayCards.slice(start, end);

		// создание карточек
		$cardsWrapper.innerHTML = '';

		notesCards.forEach((user) => {

			const $card = $cardTpl.cloneNode(true);

			$card.removeAttribute('id');
			$card.removeAttribute('style');

			const $userName = $card.querySelector('.js-user-name');
			const $userAva = $card.querySelector('.js-user-ava');

			$userName.textContent = `${user.first_name}`;
			$userAva.setAttribute('src', user.avatar);

			$cardsWrapper.append($card);
		});
	};

	$mainRight.addEventListener('click', event => {

		if (event.target.classList.contains('btn-delete-user')) {
			const deleteCardUser = event.target.closest('.card-friends');
			deleteCardUser.remove();
		};
	});
};

getResponse()


// предыдущий код ===========================//
/* function request(method, url) {
	return new Promise((resolve, reject) => {
		const xhr = new XMLHttpRequest();
		xhr.open(method, url);
		xhr.send();
		xhr.onload = function () {
			if (xhr.status === 200) {
				resolve(JSON.parse(xhr.response));
			} else {
				reject(xhr);
			}
		};
	});
} */

/* // pagination
let pagination = document.querySelector('#pagin');
// кол-во страниц
let totalPages = 8;

for (let i = 1; i <= totalPages; i++) {
	let li = document.createElement('li');
	li.classList.add('pagin-li');
	li.innerHTML = i;
	pagination.appendChild(li);
}

function makeRequest() {
	request('GET', `https://reqres.in/api/users?page&per_page=12`)

		.then(function (response) {
			const cardsArray = response.data;

			$cardsWrapper.innerHTML = '';

			cardsArray.forEach((user) => {

				const $card = $cardTpl.cloneNode(true);

				$card.removeAttribute('id');
				$card.removeAttribute('style');

				const $userName = $card.querySelector('.js-user-name');
				const $userAva = $card.querySelector('.js-user-ava');

				$userName.textContent = `${user.first_name}`;
				$userAva.setAttribute('src', user.avatar);

				$cardsWrapper.append($card);
			});
		});

	$mainRight.addEventListener('click', event => {

		if (event.target.classList.contains('btn-delete-user')) {
			const deleteCardUser = event.target.closest('.card-friends');
			deleteCardUser.remove();
		};

		if (event.target.classList.contains('pagin-li')) {
			console.log(event.target.textContent);
		};
	});
};

makeRequest(); */