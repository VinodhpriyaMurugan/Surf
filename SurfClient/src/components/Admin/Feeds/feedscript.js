const employeeContainer = document.getElementById('employee-container');

const fetchDataAndDisplay = async () => {
  try {
    // const response = await fetch('http://localhost:8080/tpfSoftware/checkJoiningDate');
    // const data = await response.json();
    const data = window.employeeDataFromComponent;
    console.log(data);
    if (data.length === 0) {
      employeeContainer.innerHTML = 'No employees joined today.';
    } else if (data.length === 1) {
      const employee = data[0];
      employeeContainer.innerHTML = `${employee.empName} - ${employee.noOfYears} years of experience`;
    } else {
      let currentIndex = 0;

      setInterval(() => {
        const employee = data[currentIndex];
        employeeContainer.innerHTML = `${employee.empName} - ${employee.noOfYears} years of experience`;

        currentIndex = (currentIndex + 1) % data.length;
      }, 10000);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    employeeContainer.innerHTML = 'Error fetching data.';
  }
};

// Fetch and display data immediately and refresh every 24 hours
fetchDataAndDisplay();
setInterval(fetchDataAndDisplay, 24 * 60 * 60 * 1000);
