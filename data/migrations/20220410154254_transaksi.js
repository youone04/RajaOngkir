exports.up = function(knex) {
    return knex.schema.raw('create extension if not exists "uuid-ossp"')
    .createTable('transaksi' , (table) => {
        table.increments('id').primary();
        table.integer('user_id').notNullable();
        table.string('username').notNullable();
        table.string('bukti_bayar').notNullable();
        table.string('email').notNullable();
        table.string('provinsi').notNullable();
        table.string('kabupaten').notNullable();
        table.string('alamat').notNullable();
        table.string('ongkir').notNullable();
        table.string('tagihan_total').notNullable();
        table.string('estimasi').notNullable();
        table.string('service').notNullable();
        table.string('no_resi');
        table.boolean('status').defaultTo(false);
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    })
};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('transaksi')
};