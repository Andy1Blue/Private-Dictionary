$(document).ready(function () {
    $("input").attr("maxlength", 100);
    let whatIsClicked;
    $('.inputEdit').hide();
    $('span').dblclick(function (e) {
        $('#' + $(e.target).attr('class')).show();
        $('.' + $(e.target).attr('class')).hide();
        whatIsClicked = $(e.target).attr('class');
        $('#' + $(e.target).attr('class')).focus();
    });
    $(this).dblclick(function (e) {
        let symbol = e.target.nextElementSibling.id.substring(0, 2);
        //console.log(symbol);
        let wordId = e.target.nextElementSibling.id.substring(2);
        //console.log(wordId);
        let input = e.target.nextElementSibling;
        //console.log(input);
        input.addEventListener('blur', function () {
            let wordNew = $('#' + symbol + wordId).val();
            //console.log(wordNew);
            //$('.pl' + wordId).val(wordOneNew);

            if (symbol == 'pl') {
                let wordOneNew = wordNew;
                let data = {
                    wordId,
                    wordOneNew
                };
                fetch('http://localhost:3333/updateWordOne', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })
                //.then((data) => console.log(data));
            }
            if (symbol == 'en') {
                let data = {
                    'wordId': wordId,
                    'wordTwoNew': wordNew
                };
                fetch('http://localhost:3333/updateWordTwo', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })
                //.then((data) => console.log(data));
            }
            if (symbol == 'fo') {
                let data = {
                    'wordId': wordId,
                    'wordThreeNew': wordNew
                };
                fetch('http://localhost:3333/updateWordThree', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })
                //.then((data) => console.log(data));
            }
            $('.inputEdit').hide();
            if (wordNew == "" || wordNew == " ") {
                wordNew = "Uzupełnij!";
            }
            $('.' + symbol + wordId).text(wordNew);
            $('.' + symbol + wordId).show();
        });
        // let what = $(e.target).attr('id');
        // if (what != whatIsClicked) {
        //     $('#' + whatIsClicked + 'f').submit();
        //     }

    });
});