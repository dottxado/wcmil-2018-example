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

	var RichText = wp.editor.RichText;

	var MediaUpload = wp.editor.MediaUpload;

	var Button = wp.components.Button;


	/**
	 * Every block starts by registering a new block type definition.
	 * @see https://wordpress.org/gutenberg/handbook/block-api/
	 */
	registerBlockType( 'wcmil-2018-example/block-03', {
		/**
		 * This is the display title for your block, which can be translated with `i18n` functions.
		 * The block inserter will show this name.
		 */
		title: __( 'Block 03' ),

		/**
		 * Blocks are grouped into categories to help users browse and discover them.
		 * The categories provided by core are `common`, `embed`, `formatting`, `layout` and `widgets`.
		 */
		category: 'widgets',

		attributes: {
			id: {
				type: 'number',
			},
			url: {
				type: 'url',
			},
			description: {
				source: 'children',
				selector: 'p',
			}
		},

		parent: ['wcmil-2018-example/block-02'],

		/**
		 * Optional block extended support features.
		 */
		supports: {
			// Removes support for an HTML mode.
			html: false,
		},

		/**
		 * The edit function describes the structure of your block in the context of the editor.
		 * This represents what the editor will render when the block is used.
		 * @see https://wordpress.org/gutenberg/handbook/block-edit-save/#edit
		 *
		 * @param {Object} [props] Properties passed from the editor.
		 * @return {Element}       Element to render.
		 */
		edit: function( props ) {
			var url = props.attributes.url;
			var id = props.attributes.id;
			var description = props.attributes.description;
			return el(
				'div',
				{
					className: [props.className, 'column'].join(' ')
				},
				el(
					MediaUpload, {
						allowedTypes: ['image'],
						value: id,
						onSelect: function (newFile) {
							return props.setAttributes({
								url: newFile.url,
								id: newFile.id,
							});
						},
						render: function (obj) {
							return el(Button, {
									className: !!url ? 'image-button' : 'button button-large',
									onClick: obj.open
								},
								!!url ? el('img', {src: url}) : el('span', { className: 'dashicons dashicons-format-image' })
							);
						}
					}
				),
				el(
					RichText, {
						tagName: 'p',
						value: description,
						onChange: function (newValue) {
							props.setAttributes({description: newValue});
						},
						placeholder: __('Inserisci la descrizione'),
						keepPlaceholderOnFocus: true,
						formattingControls: [],
					}
				),
			);
		},

		/**
		 * The save function defines the way in which the different attributes should be combined
		 * into the final markup, which is then serialized by Gutenberg into `post_content`.
		 * @see https://wordpress.org/gutenberg/handbook/block-edit-save/#save
		 *
		 * @return {Element}       Element to render.
		 */
		save: function(props) {
			return el(
				'div',
				{
					className: 'column'
				},
				el(
					'img', {
						src: props.attributes.url,
					}
				),
				el(
					RichText.Content, {
						tagName: 'p',
						value: props.attributes.description,
					}
				),
			);
		}
	} );
} )(
	window.wp
);
