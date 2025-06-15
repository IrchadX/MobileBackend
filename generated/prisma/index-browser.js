
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 6.6.0
 * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
 */
Prisma.prismaVersion = {
  client: "6.6.0",
  engine: "f676762280b54cd07c770017ed3711ddde35f37a"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.AlertScalarFieldEnum = {
  id: 'id',
  type: 'type',
  time: 'time',
  date: 'date',
  zone: 'zone',
  status: 'status',
  level: 'level',
  device_id: 'device_id'
};

exports.Prisma.DeviceScalarFieldEnum = {
  id: 'id',
  type_id: 'type_id',
  state_type_id: 'state_type_id',
  user_id: 'user_id',
  mac_address: 'mac_address',
  software_version: 'software_version',
  date_of_service: 'date_of_service',
  comm_state: 'comm_state',
  connection_state: 'connection_state',
  battery_capacity: 'battery_capacity',
  price: 'price'
};

exports.Prisma.Device_typeScalarFieldEnum = {
  id: 'id',
  type: 'type'
};

exports.Prisma.Emergency_contactScalarFieldEnum = {
  id: 'id',
  label: 'label',
  number: 'number'
};

exports.Prisma.Env_delimiterScalarFieldEnum = {
  id: 'id',
  created_at: 'created_at',
  updated_at: 'updated_at',
  env_id: 'env_id',
  coordinates: 'coordinates',
  type: 'type'
};

exports.Prisma.Env_userScalarFieldEnum = {
  id: 'id',
  user_id: 'user_id',
  env_id: 'env_id'
};

exports.Prisma.EnvironmentScalarFieldEnum = {
  id: 'id',
  name: 'name',
  description: 'description',
  address: 'address',
  created_at: 'created_at',
  updated_at: 'updated_at',
  map_id: 'map_id',
  is_public: 'is_public',
  surface: 'surface'
};

exports.Prisma.ExpenseScalarFieldEnum = {
  id: 'id',
  created_at: 'created_at',
  label: 'label',
  amount: 'amount',
  category: 'category',
  description: 'description',
  date: 'date'
};

exports.Prisma.FormatScalarFieldEnum = {
  id: 'id',
  format: 'format'
};

exports.Prisma.Helper_userScalarFieldEnum = {
  id: 'id',
  user_id: 'user_id',
  helper_id: 'helper_id',
  state: 'state'
};

exports.Prisma.Intervention_historyScalarFieldEnum = {
  id: 'id',
  device_id: 'device_id',
  maintenancier_id: 'maintenancier_id',
  scheduled_date: 'scheduled_date',
  completion_date: 'completion_date',
  description: 'description',
  status: 'status',
  type: 'type',
  title: 'title',
  location: 'location'
};

exports.Prisma.LocalisationScalarFieldEnum = {
  id: 'id',
  longitude: 'longitude',
  latitude: 'latitude',
  userId: 'userId',
  updated_at: 'updated_at'
};

exports.Prisma.MapScalarFieldEnum = {
  id: 'id',
  created_at: 'created_at',
  format_id: 'format_id'
};

exports.Prisma.Market_potentielScalarFieldEnum = {
  id: 'id',
  created_at: 'created_at',
  city: 'city',
  potential_value: 'potential_value'
};

exports.Prisma.Panne_historyScalarFieldEnum = {
  id: 'id',
  alert_id: 'alert_id'
};

exports.Prisma.PoiScalarFieldEnum = {
  id: 'id',
  created_at: 'created_at',
  env_id: 'env_id',
  category_id: 'category_id',
  name: 'name',
  description: 'description',
  coordinates: 'coordinates',
  image_url: 'image_url',
  map_id: 'map_id'
};

exports.Prisma.Poi_categoryScalarFieldEnum = {
  id: 'id',
  category: 'category'
};

exports.Prisma.Poi_zoneScalarFieldEnum = {
  id: 'id',
  created_at: 'created_at',
  poi_id: 'poi_id',
  zone_id: 'zone_id'
};

exports.Prisma.PricingScalarFieldEnum = {
  id: 'id',
  attribute: 'attribute',
  price: 'price'
};

exports.Prisma.Purchase_historyScalarFieldEnum = {
  id: 'id',
  date: 'date',
  user_id: 'user_id',
  device_id: 'device_id',
  public: 'public'
};

exports.Prisma.State_typeScalarFieldEnum = {
  id: 'id',
  state: 'state'
};

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  created_at: 'created_at',
  family_name: 'family_name',
  first_name: 'first_name',
  phone_number: 'phone_number',
  password: 'password',
  userTypeId: 'userTypeId',
  email: 'email',
  sex: 'sex',
  street: 'street',
  city: 'city',
  birth_date: 'birth_date',
  Identifier: 'Identifier'
};

exports.Prisma.User_typeScalarFieldEnum = {
  id: 'id',
  created_at: 'created_at',
  type: 'type'
};

exports.Prisma.ZoneScalarFieldEnum = {
  id: 'id',
  created_at: 'created_at',
  env_id: 'env_id',
  name: 'name',
  description: 'description',
  type_id: 'type_id',
  coordinates: 'coordinates',
  updated_at: 'updated_at',
  map_id: 'map_id',
  zone_type: 'zone_type'
};

exports.Prisma.Zone_typeScalarFieldEnum = {
  id: 'id',
  created_at: 'created_at',
  type: 'type',
  color: 'color',
  icon: 'icon',
  name: 'name',
  description: 'description',
  priority: 'priority',
  accessible: 'accessible'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.NullableJsonNullValueInput = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};

exports.Prisma.JsonNullValueFilter = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull,
  AnyNull: Prisma.AnyNull
};
exports.level_new = exports.$Enums.level_new = {
  critique: 'critique',
  modere: 'modere',
  mineur: 'mineur'
};

exports.ExpenseCategory = exports.$Enums.ExpenseCategory = {
  COGS: 'COGS',
  SALARY: 'SALARY',
  MAINTENANCE: 'MAINTENANCE',
  UTILITIES: 'UTILITIES',
  MARKETING: 'MARKETING',
  OTHER: 'OTHER'
};

exports.intervention_type = exports.$Enums.intervention_type = {
  technique: 'technique',
  Non_technique: 'Non_technique'
};

exports.Prisma.ModelName = {
  alert: 'alert',
  device: 'device',
  device_type: 'device_type',
  emergency_contact: 'emergency_contact',
  env_delimiter: 'env_delimiter',
  env_user: 'env_user',
  environment: 'environment',
  expense: 'expense',
  format: 'format',
  helper_user: 'helper_user',
  intervention_history: 'intervention_history',
  localisation: 'localisation',
  map: 'map',
  market_potentiel: 'market_potentiel',
  panne_history: 'panne_history',
  poi: 'poi',
  poi_category: 'poi_category',
  poi_zone: 'poi_zone',
  pricing: 'pricing',
  purchase_history: 'purchase_history',
  state_type: 'state_type',
  user: 'user',
  user_type: 'user_type',
  zone: 'zone',
  zone_type: 'zone_type'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }

        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
