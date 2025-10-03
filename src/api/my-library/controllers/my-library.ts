'use strict';

/**
 * A set of functions called "actions" for customizing the my-library controller
 */

module.exports = {
  async findMine(ctx) {
    const user = ctx.state.user;

    if (!user) {
      return ctx.unauthorized('Debes iniciar sesión para ver tu biblioteca.');
    }

    try {
      // Busca los libros de la biblioteca que pertenecen al usuario actual
      const libraryBooks = await strapi.entityService.findMany(
        'api::librarybook.librarybook',
        {
          filters: { users_permissions_user: { id: user.id } },
          populate: '*', // O especifica los campos que quieres popular
        }
      );

      // transformResponse es parte de los controladores creados por la factoría.
      // Para un controlador personalizado, simplemente devuelve los datos.
      // Strapi se encargará de la respuesta JSON.
      return libraryBooks;
    } catch (err) {
      // Es una buena práctica manejar errores potenciales
      ctx.internalServerError('Ocurrió un error al buscar en la biblioteca.', { moreDetails: err.message });
    }
  },
};