// Function to post appointments using Axios
function submitAppointmentRequest(event) {
  event.preventDefault();

  const full_name = document.getElementById("full_name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const appointment_date = document.getElementById("appointment_date").value;
  const appointment_time = document.getElementById("appointment_time").value;
  const reason = document.getElementById("reason").value;

  const obj = {
    full_name,
    email,
    phone,
    appointment_date,
    appointment_time,
    reason,
  };

  axios
    .post("http://localhost:4000/appointmentrequests", obj)
    .then((response) => {
      // console.log('Appointment request submitted successfully',response);
    })
    .catch((error) => {
      console.error("Error submitting appointment request:", error);
    });
}
