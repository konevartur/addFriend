const $mainRight = document.getElementById('main-right');
const $cardsWrapper = document.getElementById('cards-wrapper');
const $cardTpl = document.getElementById('card-frends-template');

const $pagination = document.querySelector('#pagin');
const $loader = document.querySelector('#loader');

const $modal = document.getElementById('mymodal');
const $closeModal = document.querySelector('.close-mymodal');


let preventRequesting = false;
let stopRequest = true;
let pageNumber = 1;

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
		}
	});
}

function makeRequest() {
	request('GET', `https://reqres.in/api/users?page=${pageNumber}&per_page=3`)
		.then(function (response) {
			const cardsArray = response.data;
			console.log(cardsArray);
			if (cardsArray.length === 0) {
				stopRequest = false;
			}

			$loader.classList.add('hide');

			preventRequesting = false;

			cardsArray.forEach((user) => {

				const $card = $cardTpl.cloneNode(true);

				$card.removeAttribute('id');
				$card.removeAttribute('style');

				const $userName = $card.querySelector('.js-user-name');
				const $userAva = $card.querySelector('.js-user-ava');

				$userName.textContent = `${user.first_name}`;
				$userAva.setAttribute('src', user.avatar);

				$cardsWrapper.append($card);

				// modal window
				const $userLastName = document.querySelector('.js-last-name');
				const $userEmail = document.querySelector('.js-email');
				$userLastName.textContent = `${user.last_name}`;
				$userEmail.textContent = `${user.email}`;

			});
		});
}

makeRequest();

// удалить карточку через делегирование
$mainRight.addEventListener('click', event => {
	if (event.target.classList.contains('btn-delete-user')) {
		const deleteCardUser = event.target.closest('.card-friends');
		deleteCardUser.remove();
	}
});

// скролл страницы
window.addEventListener('scroll', () => {
	if (stopRequest) {
		if (!preventRequesting && (Math.ceil(window.pageYOffset + innerHeight) + 150) > document.body.clientHeight) {
			preventRequesting = true;
			pageNumber++;
			$loader.classList.remove('hide');
			makeRequest();
		}
	}
});

// открыть модальное окно через делегирование
$mainRight.addEventListener('click', event => {
	if (event.target.classList.contains('js-btn-info')) {
		mymodal.style.display = 'block';
	}
});

// закрываю модальное окно на крест
$closeModal.addEventListener('click', () => {
	mymodal.style.display = 'none';
});

// закрываю модальное по нажатию на пустое место
window.addEventListener('click', event => {
	if (event.target == $modal) {
		mymodal.style.display = 'none';
	}
});