# Inventory System Ombudsman.go.th
Backend Product about manament inventory.

## Installation 
```bash
npm install
```

## Platform or Pattern for Learning
    - MVC
    - Typescript (Node js)
    - RESTful API

## Library important
    - express
    - lodash
    - moment
    - nodemailer
    - typeorm
    - node-cron
    - body-parser

*** ldapService we use way run webservice "connect_ldap.php" on php then nodejs call service 

## Path Folder
> src
    > api
        - router for call api service 
    > constants
        - http status codes
    > entities
        - Configuration
    > services
        - Services get post data with typeorm or mssql and
index.ts
    - start run and set port, bodyParser, set node-cron
ormconfig.json
    - Data Configuration typeorm
tslint.json
    - Configuration tslint about limit coding typescript

## Git repository
[OMB_system_borrow](https://pattapee@bitbucket.org/pattapee/omb_system_inventory_node)

## License
[Ombudsman.go.th](https://www.ombudsman.go.th)