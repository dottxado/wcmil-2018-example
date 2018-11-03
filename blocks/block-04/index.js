( function( wp ) {
	/**
	 * Registers a new block provided a unique name and an object defining its behavior.
	 * @see https://github.com/WordPress/gutenberg/tree/master/blocks#api
	 */
	var registerBlockType = wp.blocks.registerBlockType;
	/**
	 * Returns a new element of given type. Element is an abstraction layer atop React.
	 * @see https://github.com/WordPress/gutenberg/tree/master/element#element
	 */
	var el = wp.element.createElement;
	/**
	 * Retrieves the translation of text.
	 * @see https://github.com/WordPress/gutenberg/tree/master/i18n#api
	 */
	var __ = wp.i18n.__;

	var InspectorControls = wp.editor.InspectorControls;

	var PanelBody = wp.components.PanelBody;

	var RangeControl = wp.components.RangeControl;

	/**
	 * Every block starts by registering a new block type definition.
	 * @see https://wordpress.org/gutenberg/handbook/block-api/
	 */
	registerBlockType( 'wcmil-2018-example/block-04', {
		/**
		 * This is the display title for your block, which can be translated with `i18n` functions.
		 * The block inserter will show this name.
		 */
		title: __( 'Block 04' ),

		/**
		 * Blocks are grouped into categories to help users browse and discover them.
		 * The categories provided by core are `common`, `embed`, `formatting`, `layout` and `widgets`.
		 */
		category: 'widgets',

		attributes: {
			min: {
				type: 'number',
				default: 2,
			},
			max: {
				type: 'number',
				default: 100,
			}
		},

		/**
		 * The edit function describes the structure of your block in the context of the editor.
		 * This represents what the editor will render when the block is used.
		 * @see https://wordpress.org/gutenberg/handbook/block-edit-save/#edit
		 *
		 * @param {Object} [props] Properties passed from the editor.
		 * @return array {Element}       Element to render.
		 */
		edit: function( props ) {
			return [
				el(
					InspectorControls, {key: 'inspector'},
					el(
						PanelBody, {
							title: __('Informazioni Aggiuntive'),
							initialOpen: true
						},
						el(
							RangeControl, {
								label: __('Numero minimo di utenti'),
								initialPosition: props.attributes.min.default,
								value: props.attributes.min,
								min: 2,
								max: 100,
								onChange: function (newValue) {
									props.setAttributes({min: newValue});
								}
							}
						),
						el(
							RangeControl, {
								label: __('Numero massimo di utenti'),
								initialPosition: props.attributes.max.default,
								value: props.attributes.max,
								min: 2,
								max: 100,
								onChange: function (newValue) {
									props.setAttributes({max: newValue});
								}
							}
						),
					),
				),
				el(
				'p',
				{ className: props.className },
				__( 'Questo blocco mostrerà il numero di utenti attivi sul sito.' )
			)];
		},

		/**
		 * The save function defines the way in which the different attributes should be combined
		 * into the final markup, which is then serialized by Gutenberg into `post_content`.
		 * @see https://wordpress.org/gutenberg/handbook/block-edit-save/#save
		 *
		 * @return {Element}       Element to render.
		 */
		save: function() {
			return null;
		}
	} );
} )(
	window.wp
);
