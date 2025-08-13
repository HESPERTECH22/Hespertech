// document.addEventListener('DOMContentLoaded', function () {
//     const tabs = document.querySelectorAll('.project-tab');
//     const contents = document.querySelectorAll('.project-content');

//     tabs.forEach((tab, index) => {
//         tab.addEventListener('click', function () {
//             activateTab(index);
//             tab.focus();
//         });

//         // Arrow key navigation
//         tab.addEventListener('keydown', function (e) {
//             let newIndex = index;
//             if (e.key === 'ArrowRight') {
//                 newIndex = (index + 1) % tabs.length;
//             } else if (e.key === 'ArrowLeft') {
//                 newIndex = (index - 1 + tabs.length) % tabs.length;
//             } else {
//                 return; // handle arrow keys only
//             }

//             tabs[newIndex].focus();
//             activateTab(newIndex);
//         });
//     });

//     function activateTab(index) {
//         tabs.forEach(t => t.classList.remove('active'));
//         contents.forEach(c => c.classList.remove('active'));
//         tabs[index].classList.add('active');
//         contents[index].classList.add('active');
//     }
// });



