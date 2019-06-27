
const operationDetails = (success = false, message = "", value = null) => {
    return { 
        success: success, 
        message: message, 
        value: value 
    };
};

module.exports = operationDetails;