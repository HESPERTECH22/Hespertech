

$("#client-form").submit(function (e) {
    e.preventDefault();

    $(".send-div").removeClass("error");
    $(".send-div").removeClass("success");

    $(".send-div").show();
    $(".loader-text").html("Sending...<br>Please wait...");
    const formData = $(this).serializeArray();
    const data = {};

    $(formData).each(function (index, obj) {
        data[obj.name] = obj.value.trim();
    });

    // console.log("Sending:", data);

    $.ajax({
        url: `

        https://script.google.com/macros/s/AKfycbwxfnDr3lgI94ZOtArovV3nqFjwNy2nsIhl5YDwwhKOzA4-weTWqXgY-OyiVdHxXE_v/exec

        
        `.trim(),
        method: "POST",
        data: JSON.stringify(data),
        success: function (response) {
            // console.log("Success:", response);

            if (response.result === "success") {
                $("#client-form")[0].reset();

                $(".send-div").addClass("success");
                typeText(".loader-text", "Message sent successfully ✅");
                setTimeout(() => {
                    $(".send-div").fadeOut(1000);
                }, 3000);

            } else {
                $(".send-div").addClass("error");
                typeText(".loader-text","An error occurred while sending the message.Please try again later.");
                setTimeout(() => {
                    $(".send-div").fadeOut(1000);
                }, 3000);
                

            }

            
        },
        error: function (err) {
            console.log("Error", err);
            $(".send-div").addClass("error");
            typeText(".loader-text", "An error occurred while sending the message.<br>Please try again later.");
            setTimeout(() => {
                $(".send-div").fadeOut(1000);
            }, 3000);

        }
    });
});



