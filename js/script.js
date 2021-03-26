const $mainRight = document.getElementById('main-right');
const $cardsWrapper = document.getElementById('cards-wrapper');
const $cardTpl = document.getElementById('card-frends-template');

function request(method, url) {
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
}

// 1-й способ удаления карточки
/* request('GET', 'https://reqres.in/api/users?page=1')
	.then(function (response) {
		const cardsArray = response.data;

		cardsArray.forEach((user) => {

			const deleteUser = function () {
				$card.remove()
				$deleteUser.removeEventListener('click', deleteUser);
			}

			const $card = $cardTpl.cloneNode(true);

			$card.removeAttribute('id');
			$card.removeAttribute('style');

			const $userName = $card.querySelector('.js-user-name');
			const $userAva = $card.querySelector('.js-user-ava');

			$userName.textContent = `${user.first_name}`;
			$userAva.setAttribute('src', user.avatar);

			$mainRight.append($card);

			const $deleteUser = $card.querySelector('.btn-delete-user');

			$deleteUser.addEventListener('click', deleteUser)
		});
	}); */

/* request('GET', 'https://reqres.in/api/users?page=1&per_page=3')
	.then(function (response) {
		const cardsArray = response.data;

		cardsArray.forEach((user) => {

			const $card = $cardTpl.cloneNode(true);

			$card.removeAttribute('id');
			$card.removeAttribute('style');

			const $userName = $card.querySelector('.js-user-name');
			const $userAva = $card.querySelector('.js-user-ava');

			$userName.textContent = `${user.first_name}`;
			$userAva.setAttribute('src', user.avatar);

			$mainRight.append($card);
		});
	});

// 2-й способ удаления карточки, с помощью делегирования
document.getElementById('main-right').addEventListener('click', event => {

	const deleteUser = event.target;

	if (deleteUser.classList.contains('btn-delete-user')) {
		const deleteCardUser = deleteUser.closest('.card-friends');
		deleteCardUser.remove();
	}
}) */


// pagination 
let pagination = document.querySelector('#pagin');
// кол-во страниц
let totalPages = 8;

for (let i = 1; i <= totalPages; i++) {
	let li = document.createElement('li');
	li.classList.add('pagin-li')
	li.innerHTML = i;
	pagination.appendChild(li);
}

function makeRequest() {
	request('GET', `https://reqres.in/api/users?page=1&per_page=3`)

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
		}
	});
};

makeRequest();