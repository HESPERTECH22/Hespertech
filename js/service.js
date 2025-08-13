$("#service-form").submit(function (e) {
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

    console.log("Sending:", data);

    $.ajax({
        url: `
        
https://script.google.com/macros/s/AKfycbyVIYzzBSuT9dgXmg9WgrzlPZ4pb-xYyQNS5EpBqCO0u94Z-bsbmWU8gEeTXaNqZH3D/exec


        `.trim(),
        method: "POST",
        data: JSON.stringify(data),
        success: function (response) {


            if (response.result === "error") {
                // console.log("Error", response);

                $(".send-div").addClass("error");
                typeText(".loader-text", "An error occurred while sending the message.Please try again later.");
                setTimeout(() => {
                    $(".send-div").fadeOut(1000);
                }, 3000);

            } else {
                // susccess
                // console.log("Success:", response);
                $(".send-div").addClass("success");
                typeText(".loader-text", "Application sent successfully! ✅");
                setTimeout(() => {
                    $(".send-div").fadeOut(1000);
                }, 3000);

                $("#service-form")[0].reset();
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

