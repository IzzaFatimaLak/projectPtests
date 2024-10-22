const { success} = require("../utils");



module.exports = {
  createShift: async(shift,page,name,night) => {
        await shift.addNewShiftButtton();
        await shift.title(name);
        await shift.addDepartment("2nd");
        await shift.startTime(night);
        await shift.endTime(night);
        await shift.repeatOn(5);
        await shift.doneButton();
        if (name == "ShiftB")
        {
            await shift.verification();
            await shift.validate();
        }
        else{
        await success("Shift created successfully!",page);
        }
        
    
  },
}
