document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.checkbox-item').forEach(item => {
        const checkbox = item.querySelector('input[type="checkbox"]');
        const label = item.querySelector('label');

        // Prevent double toggling from <label for="">
        if (label && checkbox) {
            label.removeAttribute('for');
        }


        
        item.addEventListener('click', function (e) {
            if (e.target !== checkbox) {
                checkbox.checked = !checkbox.checked;
            }
        });
    });
});

  




$("#vendor-form").submit(function (e) {
    e.preventDefault();

    // Basic form validation first
    const requiredFields = this.querySelectorAll('[required]');
    let isValid = true;

    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.style.borderColor = '#dc3545';
            isValid = false;    
        } else {
            field.style.borderColor = '#e9ecef';
        }
    });

    // // If validation fails, show error and stop
    if (!isValid) {
        alert('Please fill in all required fields.');
        return;
    }

    // //Show loading state
    $(".send-div").removeClass("error success");
    $(".send-div").show();
    $(".loader-text").html("Sending...<br>Please wait...");

    // //Collect form data including checkbox arrays
    const formData = $(this).serializeArray();
    const data = {};

    // //Handle regular form fields
    $(formData).each(function (index, obj) {
        if (obj.name.endsWith('[]')) {
            // //Handle array fields (like services[])
            const fieldName = obj.name.replace('[]', '');
            if (!data[fieldName]) {
                data[fieldName] = [];
            }
            data[fieldName].push(obj.value.trim());
        } else {
            data[obj.name] = obj.value.trim();
        }
    });

    // //Convert services array to comma-separated string for easier handling
    if (data.services && Array.isArray(data.services)) {
        data.services = data.services.join(', ');
    }

    console.log("Sending:", data);

    $.ajax({
        url: `
        
https://script.google.com/macros/s/AKfycbyQ_r_HtP3c6Ysfd4KXKjJ3mVhaSo6vThZj7hgFRdalx5hetiURrSqiV0Fw65qeaind/exec


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

                // Reset form after successful submission
                $("#vendor-form")[0].reset();

                //Reset field border colors
                requiredFields.forEach(field => {
                    field.style.borderColor = '#e9ecef';
                });
            }
        
        
        },
        error: function (err) {
            
            console.log("Error",err);
            $(".send-div").addClass("error");
            typeText(".loader-text", "An error occurred while sending the message.<br>Please try again later.");
            setTimeout(() => {
                $(".send-div").fadeOut(1000);
            }, 3000);

        }
    });
});