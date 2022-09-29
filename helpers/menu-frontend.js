const getMenuFrontEnd = (role = 'USER_ROLE') => {

    const menu = [{
            title: 'Dashboard',
            icon: 'mdi mdi-gauge',
            subMenu: [
                { title: 'Main', url: '/' },
                { title: 'ProgressBar', url: 'progress' },
                { title: 'Graficas', url: 'grafica1' },
                { title: 'Promesas', url: 'promesas' },
                { title: 'Rxjs', url: 'rxjs' },
            ]
        },
        {
            title: 'Mantenimientos',
            icon: 'mdi mdi-folder-lock-open',
            subMenu: [
                { title: 'Hospitales', url: 'hospitales' },
                { title: 'Médicos', url: 'medicos' },
            ]
        }
    ];

    if (role === 'ADMIN_ROLE') {
        menu[1].subMenu.unshift({ title: 'Usuarios', url: 'usuarios' });
    }

    return menu;
};

module.exports = {
    getMenuFrontEnd
};