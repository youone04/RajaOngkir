exports.up = function(knex) {
    return knex.schema.raw('create extension if not exists "uuid-ossp"')
    .createTable('transaksi' , (table) => {
        table.increments('id').primary();
        table.integer('user_id').notNullable();
        table.integer('produk_id').notNullable();
        table.string('username').notNullable();
        table.string('bukti_bayar').notNullable();
        table.string('email').notNullable();
        table.string('provinsi').notNullable();
        table.string('kabupaten').notNullable();
        table.string('alamat').notNullable();
        table.integer('ongkir').notNullable();
        table.integer('tagihan_total').notNullable();
        table.string('estimasi').notNullable();
        table.string('service').notNullable();
        table.string('no_resi');
        table.string('gambar_produk');
        table.string('nama_produk').notNullable();
        table.integer('jumlah').notNullable();
        table.string('status').defaultTo('0');
        table.string('metode_pembayaran');
        table.boolean('review').defaultTo(false);
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    })
};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('transaksi')
};