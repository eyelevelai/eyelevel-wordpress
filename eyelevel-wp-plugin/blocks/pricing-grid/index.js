( function( wp ) {
    var registerBlockType = wp.blocks.registerBlockType;
    var el = wp.element.createElement;
    var __ = wp.i18n.__;

    registerBlockType( 'eyelevel-wp-plugin/pricing-grid', {
        title: __( 'EyeLevel Pricing Grid', 'eyelevel-wp-plugin' ),
        attributes: {
			title1: { type: 'string', source: 'html', selector: '#price-1 .price-sub-title' },
			title2: { type: 'string', source: 'html', selector: '#price-2 .price-sub-title' },
			title3: { type: 'string', source: 'html', selector: '#price-3 .price-sub-title' },
			title4: { type: 'string', source: 'html', selector: '#price-4 .price-sub-title' },
			subtitle1: { type: 'string', source: 'html', selector: '#price-1 .price-sub-pricing-subtitle' },
			subtitle2: { type: 'string', source: 'html', selector: '#price-2 .price-sub-pricing-subtitle' },
			subtitle3: { type: 'string', source: 'html', selector: '#price-3 .price-sub-pricing-subtitle' },
			subtitle4: { type: 'string', source: 'html', selector: '#price-4 .price-sub-pricing-subtitle' },
			desc1: { type: 'string', source: 'html', selector: '#price-1 .price-sub-pricing-description' },
			desc2: { type: 'string', source: 'html', selector: '#price-2 .price-sub-pricing-description' },
			desc3: { type: 'string', source: 'html', selector: '#price-3 .price-sub-pricing-description' },
			desc4: { type: 'string', source: 'html', selector: '#price-4 .price-sub-pricing-description' },
			features1: { type: 'array', source: 'query', selector: '#price-1 .price-feature', query: { value: { type: 'string', source: 'html' } } },
			features2: { type: 'array', source: 'query', selector: '#price-2 .price-feature', query: { value: { type: 'string', source: 'html' } } },
			features3: { type: 'array', source: 'query', selector: '#price-3 .price-feature', query: { value: { type: 'string', source: 'html' } } },
			features4: { type: 'array', source: 'query', selector: '#price-4 .price-feature', query: { value: { type: 'string', source: 'html' } } },
			priced1: { type: 'string', source: 'html', selector: '#price-1 .price-dollars' },
			priced2: { type: 'string', source: 'html', selector: '#price-2 .price-dollars' },
			priced3: { type: 'string', source: 'html', selector: '#price-3 .price-dollars' },
			priced4: { type: 'string', source: 'html', selector: '#price-4 .price-sub-pricing' },
			pricec1: { type: 'string', source: 'html', selector: '#price-1 .price-cents' },
			pricec2: { type: 'string', source: 'html', selector: '#price-2 .price-cents' },
			pricec3: { type: 'string', source: 'html', selector: '#price-3 .price-cents' }
        },
        icon: 'cart',
        category: 'widgets',
        supports: {
            html: false,
        },
        edit: function( props ) {
            var attributes = props.attributes;
            var onUpdateFeatureRow = function( event ) {
				var ids = event.target.id.split('-');
				var rid = ids[0];
				var vid = Number(ids[1]);
				var rows = attributes[rid];
				var obj = {};
				rows[vid] = { value: event.target.value };
				obj[rid] = rows;
				var otherObj = {};
				otherObj[event.target.id] = event.target.value;
				props.setAttributes(obj);
              	return props.setAttributes( otherObj );
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
                var idx = { value: '' };
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
                    fr = attributes['features'+idx].map(function(ei, ii) {
						var localVal = attributes['features'+idx+'-'+ii];
						if (typeof localVal === 'undefined') {
							localVal = ei.value;
						}
                        return el( 'input', { id: 'features'+idx+'-'+ii, value: localVal, onChange: onUpdateFeatureRow, style: { width: '100%' } } );
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
                        return el( 'div', { className: 'price-feature flex-row' }, ei.value);
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
                    price = el( 'div', { className: pClass2 }, attributes['priced'+idx] );
              	}
                return el( 'div', { className: 'price-container', id: 'price-'+idx },
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
				{ className: `price-main-container ${(props && props.className) ? props.className : ''}` },
				el(
					'div',
					{ className: 'price-toggle' },
					el(
						'div',
						{ id: 'price-annual', className: 'price-toggle-title price-toggle-active' },
						'ANNUAL'
					),
					el(
						'label',
						{ className: 'price-toggle-switch' },
						el(
							'input',
							{ type: 'checkbox' }
						),
						el(
							'span',
							{ className: 'price-toggle-slider' }
						)
					),
					el(
						'div',
						{ id: 'price-monthly', className: 'price-toggle-title' },
						'MONTHLY'
					)
				),
				el(
					'div',
					{ className: 'price-list' },
                	pricingContainer('1'),
                	pricingContainer('2'),
                	pricingContainer('3'),
                	pricingContainer('4', true)
				)
			);
        }
    } );
} )(window.wp);
