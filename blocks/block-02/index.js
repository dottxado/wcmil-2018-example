(function (wp) {
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

	var ToggleControl = wp.components.ToggleControl;

	var RangeControl = wp.components.RangeControl;

	var RichText = wp.editor.RichText;

	var InnerBlocks = wp.editor.InnerBlocks;

	function getEditTemplate(number) {
		var array = [];
		var element = ['wcmil-2018-example/block-03', {}];
		for (var i = 0; i < number; i++) {
			array.push(element);
		}
		return array;
	}

	/**
	 * Every block starts by registering a new block type definition.
	 * @see https://wordpress.org/gutenberg/handbook/block-api/
	 */
	registerBlockType('wcmil-2018-example/block-02', {
		/**
		 * This is the display title for your block, which can be translated with `i18n` functions.
		 * The block inserter will show this name.
		 */
		title: __('Block 02'),

		/**
		 * Blocks are grouped into categories to help users browse and discover them.
		 * The categories provided by core are `common`, `embed`, `formatting`, `layout` and `widgets`.
		 */
		category: 'widgets',

		/**
		 * Attribute sources are used to define the strategy by which block attribute values are extracted from saved post content.
		 */
		attributes: {
			title: {
				source: 'children',
				selector: 'h2',
			},
			hasSeparator: {
				type: 'bool',
				default: false,
			},
			numberOfColumns: {
				type: 'number',
				default: 2,
			},
		},

		/**
		 * The edit function describes the structure of your block in the context of the editor.
		 * This represents what the editor will render when the block is used.
		 * @see https://wordpress.org/gutenberg/handbook/block-edit-save/#edit
		 *
		 * @param {Object} [props] Properties passed from the editor.
		 * @return array {Element}       Element to render.
		 */
		edit: function (props) {
			return [
				el(
					InspectorControls, {key: 'inspector'},
					el(
						PanelBody, {
							title: __('Informazioni Aggiuntive'),
							initialOpen: true
						},
						el(
							ToggleControl, {
								label: __('Aggiungi linea di separazione tra titolo e contenuto'),
								checked: props.attributes.hasSeparator,
								onChange: function () {
									props.setAttributes({hasSeparator: !props.attributes.hasSeparator});
								}
							}
						),
						el(
							RangeControl, {
								label: __('Quante colonne vuoi mostrare?'),
								initialPosition: props.attributes.numberOfColumns.default,
								value: props.attributes.numberOfColumns,
								min: 1,
								max: 6,
								onChange: function (newValue) {
									props.setAttributes({numberOfColumns: newValue});
								}
							}
						),
					),
				),
				el(
					'div',
					{className: props.className},
					el(
						RichText, {
							tagName: 'h2',
							value: props.attributes.title,
							onChange: function (newValue) {
								props.setAttributes({title: newValue});
							},
							placeholder: __('Inserisci il titolo'),
							keepPlaceholderOnFocus: true,
							formattingControls: [],
						}
					),
					props.attributes.hasSeparator && el(
						'hr', {}
					),
					el(
						'div', {
							className: ['container', 'columns-' + props.attributes.numberOfColumns].join(' '),
						},
						el(
							InnerBlocks,
							{
								template: getEditTemplate(props.attributes.numberOfColumns),
								templateLock: "all",
								allowedBlocks: ['wcmil-2018-example/block-03']
							}
						),
					),
				)
			];
		},

		/**
		 * The save function defines the way in which the different attributes should be combined
		 * into the final markup, which is then serialized by Gutenberg into `post_content`.
		 * @see https://wordpress.org/gutenberg/handbook/block-edit-save/#save
		 *
		 * @return {Element}       Element to render.
		 */
		save: function (props) {
			return el(
				'div',
				{className: props.className},
				el(
					RichText.Content, {
						tagName: 'h2',
						value: props.attributes.title,
					}
				),
				props.attributes.hasSeparator && el(
				'hr', {}
				),
				el(
					'div', {
						className: ['container', 'columns-' + props.attributes.numberOfColumns].join(' '),
					},
					el(
						InnerBlocks.Content,
						{}
					),
				),
			);
		}
	});
})(
	window.wp
);
