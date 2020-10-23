( function( wp ) {
	var registerBlockType = wp.blocks.registerBlockType;
	var el = wp.element.createElement;
	var __ = wp.i18n.__;

	var MediaUpload = wp.blockEditor.MediaUpload;
	var Button = wp.components.Button;

	registerBlockType( 'eyelevel-wp-plugin/pricing-grid', {
		title: __( 'EyeLevel Pricing Grid', 'eyelevel-wp-plugin' ),
		attributes: {
			title: { type: 'string' }
		},
		icon: 'cart',
		category: 'widgets',
		supports: {
			html: false,
		},
		edit: function( props ) {
			var attributes = props.attributes;
			var onSelectVideo = function( media ) {
				return props.setAttributes( {
					mediaURL: media.url,
					mediaID: media.id,
				} );
			};
			var onUpdateInput = function( event ) {
			  var obj = {};
			  obj[event.target.id] = event.target.value;
        return props.setAttributes( obj );
			};
			var onAddRow = function ( event ) {
				var rw = event.target.id.replace('add','');
				var rows = attributes['features'+rw];
				if (typeof rows === 'undefined') {
					rows = [];
				}
				var idx = 'feature'+rw+'-'+rows.length;
				rows.push(idx);
				var obj = {};
				obj['features'+rw] = [];
				props.setAttributes( obj )
				obj['features'+rw] = rows;
				return props.setAttributes( obj );
			};
			var featuresRow = function(idx) {
				var fr;
				if (typeof attributes['features'+idx] !== 'undefined') {
					fr = attributes['features'+idx].map(function(ei) {
						return el( 'input', { id: ei, value: attributes[ei], onChange: onUpdateInput, style: { width: '100%' } } );
					});
				}
				return el( 'div', { className: 'price-container-content', value: attributes['features'+idx] },
					el( 'input', { id: 'header'+idx, className: 'flex-row price-features-title', type: 'text', placeholder: 'Features title here...', value: attributes['header'+idx], onChange: onUpdateInput, style: { width: '100%' } }),
					fr,
					el( 'button', { id: 'add'+idx, onClick: onAddRow }, '+' )
				);
			};

			var pricingContainer = function(idx, isEnterprise) {
				var pClass1 = 'price-sub-title';
			  var pClass2 = 'price-sub-pricing';
			  var pClass3 = 'price-sub-pricing-subtitle';
			  var pClass4 = 'price-sub-pricing-description';
			  if (isEnterprise) {
					pClass1 = 'price-sub-title e-title';
					pClass2 = 'price-sub-pricing e-pricing';
					pClass3 = 'price-sub-pricing-subtitle e-subtitle';
					pClass4 = 'price-sub-pricing-description e-description';
			  }
			  var price = el( 'div', { className: 'flex-middle' },
			   	el( 'input', { id: 'priced'+idx, className: pClass2, type: 'text', placeholder: 'Dollars', value: attributes['priced'+idx], onChange: onUpdateInput, style: { width: '50%' } } ),
			   	el( 'input', { id: 'pricec'+idx, className: pClass2, type: 'text', placeholder: 'Cents', value: attributes['pricec'+idx], onChange: onUpdateInput, style: { width: '50%' } } )
				);
			  if (isEnterprise) {
					price = el( 'input', { id: 'priced'+idx, className: pClass2, type: 'text', placeholder: 'Price', value: attributes['priced'+idx], onChange: onUpdateInput, style: { width: '100%' } } )
			  }
				return el( 'div', { className: 'price-container' },
					el( 'div', { className: 'price-container-inset flex-col' },
						el( 'div', { className: 'price-header-content flex-col' },
							el( 'input', { id: 'title'+idx, className: pClass1, type: 'text', placeholder: 'Title', value: attributes['title'+idx], onChange: onUpdateInput, style: { width: '100%' } } ),
							price,
							el( 'input', { id: 'subtitle'+idx, className: pClass3, type: 'text', placeholder: 'Plan range here...', value: attributes['subtitle'+idx], onChange: onUpdateInput, style: { width: '100%' } } ),
							el( 'input', { id: 'desc'+idx, className: pClass4, type: 'text', placeholder: 'Overage description here...', value: attributes['desc'+idx], onChange: onUpdateInput, style: { width: '100%' } } )
						),
						featuresRow(idx)
					)
				);
			};

			return el(
				'div',
				{ className: `price-list ${(props && props.className) ? props.className : ''}` },
				pricingContainer('1'),
				pricingContainer('2'),
				pricingContainer('3'),
				pricingContainer('4', true)
			);
		},
		save: function( props ) {
			var attributes = props.attributes;
			var featuresRow = function(idx) {
				var fr;
				if (typeof attributes['features'+idx] !== 'undefined') {
					fr = attributes['features'+idx].map(function(ei) {
						return el( 'div', { className: 'price-feature flex-row' }, attributes[ei]);
					});
				}
				return el( 'div', { className: 'price-container-content', value: attributes['features'+idx] },
					el( 'div', { className: 'price-features-title flex-row' }, attributes['header'+idx]),
					fr
				);
			};
			var pricingContainer = function(idx, isEnterprise) {
				var pClass1 = 'price-sub-title';
			  var pClass2 = 'price-sub-pricing';
			  var pClass3 = 'price-sub-pricing-subtitle';
			  var pClass4 = 'price-sub-pricing-description';
			  if (isEnterprise) {
					pClass1 = 'price-sub-title e-title';
					pClass2 = 'price-sub-pricing e-pricing';
					pClass3 = 'price-sub-pricing-subtitle e-subtitle';
					pClass4 = 'price-sub-pricing-description e-description';
			  }
			  var price = el( 'div', { className: pClass2 },
			   	el( 'div', { className: 'price-dollars' }, attributes['priced'+idx] ),
			   	el( 'div', { className: 'price-cents' }, attributes['pricec'+idx] )
				);
			  if (isEnterprise) {
					price = el( 'div', { className: pClass2 }, attributes['priced'+idx] )
			  }
				return el( 'div', { className: 'price-container' },
					el( 'div', { className: 'price-container-inset flex-col' },
						el( 'div', { className: 'price-header-content flex-col' },
							el( 'div', { className: pClass1 }, attributes['title'+idx] ),
							price,
							el( 'div', { className: pClass3 }, attributes['subtitle'+idx] ),
							el( 'div', { className: pClass4 }, attributes['desc'+idx] )
						),
						featuresRow(idx)
					)
				);
			};
			return el(
				'div',
				{ className: `price-list ${(props && props.className) ? props.className : ''}` },
				pricingContainer('1'),
				pricingContainer('2'),
				pricingContainer('3'),
				pricingContainer('4', true)
			);
		}
	} );
} )(
	window.wp
);
