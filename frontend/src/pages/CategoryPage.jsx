import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ResponsiveContainer from '../components/ResponsiveContainer';
// animations removed to satisfy linting rules; use plain elements here
import { Heart } from 'lucide-react';

function humanize(slug) {
    return slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function CategoryPage() {
    const { category } = useParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [wishlistIds, setWishlistIds] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            setError('');
            try {
                const slug = String(category || '').toLowerCase();
                const res = await fetch(`/api/products/category/${encodeURIComponent(slug)}`);
                if (!res.ok) throw new Error('Failed to fetch products');
                const data = await res.json();
                setProducts(data.products || []);
            } catch (err) {
                setError(err.message || 'Error fetching products');
            } finally {
                setLoading(false);
            }
        };

        const fetchWishlist = async () => {
            try {
                const r = await fetch('/api/products/wishlist', { credentials: 'include' });
                if (r.ok) { const d = await r.json(); setWishlistIds((d.wishlist || []).map(i => String(i._id))) }
            } catch (err) { console.error('failed to fetch wishlist', err) }
        }

        fetchProducts();
        fetchWishlist();
    }, [category]);

    const toggleWishlist = async (productId) => {
        const inWishlist = wishlistIds.map(id => String(id)).includes(String(productId));
        try {
            if (!inWishlist) {
                await fetch('/api/products/wishlist/add', { method: 'POST', credentials: 'include', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ productId }) });
            } else {
                await fetch('/api/products/wishlist/remove', { method: 'POST', credentials: 'include', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ productId }) });
            }
            // refetch wishlist to keep state consistent
            const w = await fetch('/api/products/wishlist', { credentials: 'include' });
            if (w.ok) {
                const d = await w.json();
                const ids = (d.wishlist || []).map(i => String(i._id));
                setWishlistIds(ids);
                window.dispatchEvent(new CustomEvent('wishlistUpdated', { detail: { count: ids.length } }));
            } else if (w.status === 401) {
                // not authenticated — prompt login
                window.location.href = '/login';
            }
        } catch (e) {
            console.error('Wishlist toggle failed', e);
        }
    };

    // animations intentionally removed to keep code simple and avoid framer-motion lint issues

    return (
        <ResponsiveContainer>
            <div className="py-8">
                {/* Centered category title */}
                <div className="mb-8">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-center text-white tracking-tight drop-shadow-md" style={{ WebkitFontSmoothing: 'antialiased' }}>
                        <span className="inline-block px-4 py-1 rounded-lg bg-gradient-to-r from-[#072227] to-[#051423] hover:from-[#051423]">
                            <span className="text-[#28ffd4]">{humanize(category || '')}</span>
                        </span>
                    </h1>
                </div>

                {loading && <div className="text-center py-8">Loading products…</div>}
                {error && <div className="text-center text-red-400">{error}</div>}

                {!loading && !error && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {products.length === 0 ? (
                            <div className="col-span-full text-center text-gray-400 py-12">No products found in this category.</div>
                        ) : (
                            products.map((p) => (
                                <div key={p._id} className="border rounded-lg overflow-hidden shadow-lg bg-[#0b1220]">
                                    <img src={p.image || '/img1.png'} alt={p.name} className="w-full h-56 object-cover" />
                                    <div className="p-4">
                                        <h3 className="font-semibold text-lg mb-2 text-white">{p.name}</h3>
                                        <p className="text-sm text-gray-400 mb-3 line-clamp-3">{p.description}</p>
                                        <div className="flex items-center justify-between">
                                            <div className="text-lg font-bold text-[#24deb9]">₹{p.price}</div>
                                            <div className="text-sm text-gray-400">{p.category}</div>
                                        </div>
                                        {/* <div className="mt-3 flex items-center justify-end">
                                            <button onClick={() => toggleWishlist(p._id)} className="p-2 rounded-full">
                                                <Heart className="w-6 h-6" fill={wishlistIds.includes(p._id) ? '#24deb9' : 'transparent'} stroke={wishlistIds.includes(p._id) ? '#24deb9' : '#cbd5e1'} />
                                            </button>
                                        </div> */}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>
        </ResponsiveContainer>
    );
}
