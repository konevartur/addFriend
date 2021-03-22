/* const $mainRight = document.querySelector('.mainRight');
const $userTpl = document.getElementById('user-card-template');
const $user = $userTpl.cloneNode(true);
const $user2 = $userTpl.cloneNode(true);

$user.querySelector('.user-card-name').textContent = 'Artur';
$user.removeAttribute('id');
$user.removeAttribute('style');
$mainRight.appendChild($user);

$user2.querySelector('.user-card-name').textContent = 'Max';
$user2.removeAttribute('id');
$user2.removeAttribute('style');
$mainRight.appendChild($user2);
 */

const $mainRight = document.getElementById('mainRight');
const $cardTpl = document.getElementById('card-frends-template');
const $card = $cardTpl.cloneNode(true);

$card.removeAttribute('id');
$card.removeAttribute('style');
$mainRight.append($card);




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

//пройтись циклом по массиву с пользователями и вывести их
//пользователя запихать в карточку
request('GET', 'https://reqres.in/api/users?page=1').then(function (response) {

})