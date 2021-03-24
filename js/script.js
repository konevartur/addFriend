const $mainRight = document.getElementById('main-right');
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

request('GET', 'https://reqres.in/api/users?page=1')
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
	});

