const base = require('@playwright/test');
const {LoginPage} =  require ('../PageObjects/Login-page');
const {EmployeePage}= require('../PageObjects/Employee-page'); 
const { ProfileDetails, HealthDetails, CountryDetails, EmergencyDetails } = require('../PageObjects/Full-Employee-pages/Profile-page');
const {EmploymentDetails, RoleAndCompensaton}= require('../PageObjects/Full-Employee-pages/Employment-page')
const {PayrollDetails,PayrollBankingDetails}= require('../PageObjects/Full-Employee-pages/Payroll-Preferences-page')
const {DocumentManager}= require('../PageObjects/Full-Employee-pages/Document-Manager-page')
const {OffboardingDetails}= require('../PageObjects/Full-Employee-pages/Offboarding-page')
const {CompanyDetails}= require('../PageObjects/Settings-pages/Company-Details-page')
const {WorkLocations,Departments}= require('../PageObjects/Settings-pages/Departments-Work-Locations-page')
const {PayRollCompanyDetails,PayrollBanking,CustomPayrollFields}= require('../PageObjects/Settings-pages/Payroll-Preferences-page')
const {TimeOffRequest}= require('../PageObjects/Time-Off-Request-page');


exports.test = base.test.extend({
   
    login: async ({ page }, use) => {
      await use(new LoginPage(page));
    },

    employee: async ({ page }, use) => {
        await use(new EmployeePage(page));
    },

    profile: async ({ page }, use) => {
        await use(new ProfileDetails(page));
    },

    country: async ({ page }, use) => {
        await use(new CountryDetails(page));
    },

    emergency: async ({ page }, use) => {
        await use(new EmergencyDetails(page));
    },

    employment: async ({ page }, use) => {
        await use(new EmploymentDetails(page));
    },

    rolesAndCompensation: async ({ page }, use) => {
        await use(new RoleAndCompensaton(page));
    },

    payroll: async ({ page }, use) => {
        await use(new PayrollDetails(page));
    },

    payroll_banking: async ({ page }, use) => {
        await use(new PayrollBankingDetails(page));
    },

    offBoarding: async ({ page }, use) => {
        await use(new OffboardingDetails(page));
    },

    documentManager: async ({ page }, use) => {
        await use(new DocumentManager(page));
    },


    workLocation: async ({ page }, use) => {
        await use(new WorkLocations(page));
    },

    department: async ({ page }, use) => {
        await use(new Departments(page));
    },

    payrollCompanyDetail: async ({ page }, use) => {
        await use(new PayRollCompanyDetails(page));
    },


    payrollBankingDetail: async ({ page }, use) => {
        await use(new PayrollBanking(page));
    },

    customPayrollField: async ({ page }, use) => {
        await use(new CustomPayrollFields(page));
    },
    
    bookTimeOff: async ({ page }, use) => {
        await use(new TimeOffRequest(page));
    },

    companyDetails: async ({ page }, use) => {
        await use(new CompanyDetails(page));
    },
    

    
    
    


  });
  exports.expect = base.expect;

