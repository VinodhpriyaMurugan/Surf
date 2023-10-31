import axios from "axios";

// const baseUrl = "https://reserve.tpfsoftware.com/tpfSoftware"

 const baseUrl = "http://localhost:8080/tpfSoftware"

class userServices {

    setVaccinationDetails(details) {
        return axios.post(baseUrl + "/setVaccineStatus", details)
    }
    getToken(details) {
        return axios.post(baseUrl + "/login", details);
    }
    fetchZeroCount() {
        return axios.get(baseUrl + "/getDates")
    }
    selectAll(values){
        return axios.post(baseUrl + "/selectAll", values);
    }
    // enableMonths(){
    //     return axios.get(baseUrl + "/enableMonths");
    // }
    saveFoods(values) {

        return axios.post(baseUrl + "/updateFoods", values);

    }

    fetchBookedDates(id) {
        return axios.get(baseUrl + "/getBookedDates/" + id)
    }
    setVaccinationDetailsFull(details) {
        return axios.post(baseUrl + "/updateVaccineStatus", details)
    }
    retriveVaccineStatus(empNum) {
        return axios.get(baseUrl + "/retriveVaccineStatus/" + empNum)
    }
    getDates() {
        return axios.get(baseUrl + "/getDates")
    }
    getEmployeeById(employeeId) {
        return axios.post(baseUrl + "/getEmployeeById/" + employeeId)
    }

    getCount(empValues) {
        return axios.post(baseUrl + "/updateCount", empValues)
    }

    updateDates(empValues) {
        return axios.post(baseUrl + "/updateDates", empValues)
    }
    uploadFile(datas) {
        return axios.post(baseUrl + "/upload", datas)
    }
    getGridData(id) {
        return axios.get(baseUrl + "/getGridData/" + id)
    }
    saveFood(values) {
        return axios.post(baseUrl + "/updateFood", values);
    }
    getFoodCount(date, authToken) {

        return axios.post(baseUrl + "/getFoodCount", date, {

            headers: {

                "Authorization": 'Bearer ' + authToken

            }

        })

    }
    retriveEmployee(empNum, authToken) {
        return axios.get(baseUrl + "/retriveEmployeeById/" + empNum, {
            headers: {
                "Authorization": 'Bearer ' + authToken
            }
        })
    }
    retriveEmployeeDetails(empNum) {
        return axios.get(baseUrl + "/fetchUserDetails/" + empNum)


    }
    checkEmployeeId(empNum) {
        return axios.get(baseUrl + "/findEmployeeID/" + empNum)


    }
    deleteDates(values)
    {
        return axios.post(baseUrl + "/deleteDate", values);
    }
    updateSeatCount(values, authToken) {
        return axios.post(baseUrl + "/seatCountUpdate", values, {
            headers: {
                "Authorization": 'Bearer ' + authToken
            }
        })
    }
    getDivisonValues(authToken) {
        return axios.get(baseUrl + "/retriveDivisionValues", {
            headers: {
                "Authorization": 'Bearer ' + authToken
            }
        })

    }
    getDivison(authToken) {
        return axios.get(baseUrl + "/retriveDivision", {
            headers: {
                "Authorization": 'Bearer ' + authToken
            }
        })

    }
    saveDivision(divisionName, authToken) {
        return axios.get(baseUrl + "/saveDivision/" + divisionName, {
            headers: {
                "Authorization": 'Bearer ' + authToken
            }
        })

    }
    getPassword(empNumber, authToken) {
        return axios.get(baseUrl + "/getPassword/" + empNumber, {
            headers: {
                "Authorization": 'Bearer ' + authToken
            }
        })

    }
    savePassword(details, authToken) {
        return axios.post(baseUrl + "/savePassword", details, {
            headers: {
                "Authorization": 'Bearer ' + authToken
            }
        })

    }


    getAdmin(authToken) {
        return axios.get(baseUrl + "/getAdminList", {
            headers: {
                "Authorization": 'Bearer ' + authToken
            }
        })

    }

    getBranchValues(authToken) {
        return axios.get(baseUrl + "/retriveBranchValues", {
            headers: {
                "Authorization": 'Bearer ' + authToken
            }
        })

    }
    getBranch(division, authToken) {
        return axios.get(baseUrl + "/getBranchFromDivision/" + division, {
            headers: {
                "Authorization": 'Bearer ' + authToken
            }
        })

    }
    saveNewBranch(data, authToken) {
        return axios.post(baseUrl + "/saveBranch", data, {
            headers: {
                "Authorization": 'Bearer ' + authToken
            }
        })

    }

    getUsers() {
        return axios.get(baseUrl + "/userList")
        // , {
        //     // headers: {
        //     //     "Authorization": 'Bearer ' + authtoken
        //     // }
        // })

    }
    getResignedUsers(employeeType, authtoken) {
        return axios.get(baseUrl + "/resignedUserList/" + employeeType, {
            headers: {
                "Authorization": 'Bearer ' + authtoken
            }
        })

    }
    updateEmployee(employee, authToken) {
        return axios.post(baseUrl + "/editEmployee", employee, {
            headers: {
                "Authorization": 'Bearer ' + authToken
            }
        })
    }
    getTotalSeatCount(authToken){
        return axios.get(baseUrl + "/getTotalCount", {
            headers: {
                "Authorization": 'Bearer ' + authToken
            }
        })
    }
    addEmployee(employee, authToken) {
        return axios.post(baseUrl + "/addUser", employee, {
            headers: {
                "Authorization": 'Bearer ' + authToken
            }
        })
    }

    deleteUser(empNum, authToken) {
        return axios.post(baseUrl + "/deleteEmployee/" + empNum, {
            headers: {
                "Authorization": 'Bearer ' + authToken
            }
        })
    }
    restoreUser(empNum, authToken) {
        return axios.post(baseUrl + "/restoreEmployee/" + empNum, {
            headers: {
                "Authorization": 'Bearer ' + authToken
            }
        })
    }
    
    getReport(date, authToken) {
        return axios.post(baseUrl + "/getReport", date, {
            headers: {
                "Authorization": 'Bearer ' + authToken
            }
        })
    }


    searchByEmployeeName(searchName, authToken) {
        if (searchName === "") {
            return axios.get(baseUrl + "/userList", {
                headers: {
                    "Authorization": 'Bearer ' + authToken
                }
            })
        }
        else {
            return axios.get(baseUrl + "/searchbyName/" + searchName, {
                headers: {
                    "Authorization": 'Bearer ' + authToken
                }
            })
        }
    }
    fetchDataForFeed(value){
        return axios.post(baseUrl + "/getAnniversaryList",value)
    }
    fetchBirthdayDataForFeed(value){
        return axios.post(baseUrl + "/getBirthdayList",value)
    }

}
export default new userServices();