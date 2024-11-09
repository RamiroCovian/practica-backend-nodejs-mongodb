import User from '../models/User.js'

// Renderizo la pag login
export function index(req, res, next) {
    res.locals.error = ''
    res.locals.email = ''
    res.render('login')
}

export async function postLogin(req, res, next) {
    try {
        const { email, password } = req.body

        // busco el usuario en la base de datos
        const user = await User.findOne({ email: email.toLowerCase() })
        // si no lo encuentro, o la password no coincide --> error
        if (!user || !(await user.comparePassword(password))) {
            res.locals.error = 'Invalid credentials' // mensajo de error en la vista
            res.locals.email = email // evito que se borre el mail si hay errores
            res.render('login')
            return
        }

        // si el usuario existe y la password coincide --> apunto en su sesion que esta logado
        req.session.userId = user._id
        req.session.userName = user.email

        // redirect a la home
        res.redirect('/')
    } catch (error) {
        next(error)
    }
}

export function logout(req, res, next) {
    req.session.regenerate(err => {
        if (err) return next(err)
        res.redirect('/')
    })
}