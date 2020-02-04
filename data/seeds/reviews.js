
exports.seed = function(knex) {
  // Deletes ALL existing entries

      return knex('reviews').insert([
        {id: 1, description: 'So good so good', rating: 2 ,image:'.pgn', stylist_id: 2, customer_id: 1},
    
      ]);
   
};
