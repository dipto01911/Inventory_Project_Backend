const router=require('express').Router()


const {Registration,Login,ProfileUpdate,
ProfileDetails,RecoverVerifyEmail,
RecoverVerifyOTP,RecoverResetPass}=require('../controller/UserController')
const {Auth}=require('../middleware/Auth')

const {CreateBrand,UpdateBrand,
BrandList,BrandDropDown,DeleteBrand}=require('../controller/BrandController')

const {CreateCustomer,UpdateCustomer,
CustomerList,CustomerDropDown,
DeleteCustomer}=require('../controller/CustomerController')

const {CreateCategories,UpdateCategories,
    CategoriesList,CategoriesDropDown,DeleteCategory}=require('../controller/CategoriesController')

const {CreateSupplier,UpdateSupplier,
    SupplierList,SupplierDropDown,DeleteSupplier}=require('../controller/SupplierController')

const {CreateExpense,UpdateExpense,
ExpenseList,ExpenseDropDown}=require('../controller/ExpenseTypeController')

const {DeleteExpense,CreateExpenses,UpdateExpenses,ExpenseLists}=require('../controller/ExpenseController')

const {CreateProduct,UpdateProduct,ProductList,DeleteProduct}=require('../controller/ProductController')

const {CreatePurchase,PurchaseList,PurchaseDelete}=require('../controller/PurchaseController')

const{CreateSell,SellList,SaleDelete}=require('../controller/SalesController')

const {CreateReturn,ReturnList,ReturnDelete}=require('../controller/ReturnController')
const { ExpenseReportService, PurchaseReportService, SalesReportService, ReturnReportService } = require('../service/Report')
const { ExpenseSummary, PurChaseSummary, SalesSummary, ReturnSummary } = require('../service/Summary')


router.get('/ExpenseSummary',Auth,ExpenseSummary)
router.get('/PurchaseSummary',Auth,PurChaseSummary)
router.get('/SalesSummary',Auth,SalesSummary)
router.get('/ReturnSummary',Auth,ReturnSummary)


router.post('/CreateSell',Auth,CreateSell)
router.get('/SalesList/:pageNo/:perPage/:searchKeyword',Auth,SellList)
router.get('/SaleDelete/:id',Auth,SaleDelete)
router.post('/SalesReport',Auth,SalesReportService)

router.post('/CreateReturn',Auth,CreateReturn)
router.get('/ReturnList/:pageNo/:perPage/:searchKeyword',Auth,ReturnList)
router.get('/ReturnDelete/:id',Auth,ReturnDelete)
router.post('/ReturnReport',Auth,ReturnReportService)

router.post('/CreatePurchase',Auth,CreatePurchase)
router.get('/PurchaseList/:pageNo/:perPage/:searchKeyword',Auth,PurchaseList)
router.get('/PurchaseDelete/:id',Auth,PurchaseDelete)
router.post('/PurchaseReport',Auth,PurchaseReportService)


router.post('/CreateProduct',Auth,CreateProduct)
router.post('/UpdateProduct/:id',Auth,UpdateProduct)
router.get('/ProductList/:pageNo/:perPage/:searchKeyword',Auth,ProductList)
router.get('/DeleteProduct/:id',Auth,DeleteProduct)

router.post('/CreateExpenses',Auth,CreateExpenses)
router.post('/UpdateExpenses/:id',Auth,UpdateExpenses)
router.get('/ExpenseLists/:pageNo/:perPage/:searchKeyword',Auth,ExpenseLists)
router.get('/DeleteExpenses/:id',Auth,DeleteExpense)

router.post('/CreateExpense',Auth,CreateExpense)
router.post('/UpdateExpense/:id',Auth,UpdateExpense)
router.get('/ExpenseList/:pageNo/:perPage/:searchKeyword',Auth,ExpenseList)
router.get('/ExpenseDropDown',Auth,ExpenseDropDown)
router.post('/ExpenseReport',Auth,ExpenseReportService)

 router.post('/CreateSupplier',Auth,CreateSupplier)
 router.post('/UpdateSupplier/:id',Auth,UpdateSupplier)
 router.get('/SupplierList/:pageNo/:perPage/:searchKeyword',Auth,SupplierList)   
 router.get('/SupplierDropDown',Auth,SupplierDropDown)
 router.get('/SupplierDelete/:id',Auth,DeleteSupplier)

router.post('/CreateCategories',Auth,CreateCategories)
router.post('/UpdateCategories/:id',Auth,UpdateCategories)
router.get('/CategoriesList/:pageNo/:perPage/:searchKeyword',Auth,CategoriesList)
router.get('/CategoriesDropDown',Auth,CategoriesDropDown)
router.get('/DeleteCategory/:id',Auth,DeleteCategory)


router.post('/CreateCustomer',Auth,CreateCustomer)
router.post('/UpdateCustomer/:id',Auth,UpdateCustomer)
router.get('/CustomerList/:pageNo/:perPage/:searchKeyword',CustomerList)
router.get('/CustomerDropDown',Auth,CustomerDropDown)
router.get('/DeleteCustomer/:id',Auth,DeleteCustomer)


router.post('/Registration',Registration)
router.post('/Login',Login)
router.post('/ProfileUpdate',Auth,ProfileUpdate)
router.get('/ProfileDetails',Auth,ProfileDetails)


router.get('/RecoverVerifyEmail/:email',RecoverVerifyEmail)
router.get('/RecoverVerifyOTP/:email/:otp',RecoverVerifyOTP)
router.post('/RecoverResetPass',RecoverResetPass)



router.post('/CreateBrand',Auth,CreateBrand)
router.post('/UpdateBrand/:id',Auth,UpdateBrand)
router.get('/BrandList/:pageNo/:perPage/:searchKeyword',Auth,BrandList)
router.get('/BrandDropDown',Auth,BrandDropDown)
router.get('/DeleteBrand/:id',Auth,DeleteBrand)


module.exports=router
