'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// 位置情報の型定義
type PositionProps = {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
};

export default function AnimatedCharacters() {
    // Create refs for animation trigger
    const { ref, inView } = useInView({
        threshold: 0.2,
        triggerOnce: false,
    });

    // ランダムな登場順序を生成
    const [randomOrder, setRandomOrder] = useState<number[]>([]);

    useEffect(() => {
        // キャラクターの表示順序をランダム化
        const order = [0, 1, 2, 3, 4, 5, 6, 7];
        for (let i = order.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [order[i], order[j]] = [order[j], order[i]];
        }
        setRandomOrder(order);
    }, []);

    // Character positioning data - different for mobile and desktop
    const characters = [
        // Top row
        { id: '1', imgSrc: '/images/1.png', alt: 'Character 1', rotate: 0 },
        { id: '2', imgSrc: '/images/2.png', alt: 'Character 2', rotate: 15 }, // 傾ける
        { id: '3', imgSrc: '/images/3.png', alt: 'Character 3', rotate: -12 }, // 傾ける
        { id: '4', imgSrc: '/images/4.png', alt: 'Character 4', rotate: 0 },
        // Bottom row
        { id: '5', imgSrc: '/images/5.png', alt: 'Character 5', rotate: -10 }, // 傾ける
        { id: '6', imgSrc: '/images/6.png', alt: 'Character 6', rotate: 0 },
        { id: '7', imgSrc: '/images/7.png', alt: 'Character 7', rotate: 0 },
        { id: '8', imgSrc: '/images/8.png', alt: 'Character 8', rotate: 8 }, // 傾ける
    ];

    // Animation variants for the characters
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15, // より速いスタッガー効果
                delayChildren: 0.1,
            },
        },
    };

    // よりぴょんと弾むようなアニメーション効果
    const characterVariants = {
        hidden: { 
            opacity: 0, 
            y: 50, 
            scale: 0.7 
        },
        visible: { 
            opacity: 1, 
            y: 0,
            scale: 1,
            transition: { 
                type: "spring",
                stiffness: 400, // バネの硬さ
                damping: 20,   // 減衰（小さいほど弾む）
                mass: 0.8,     // 質量（小さいほど動きが軽快）
                velocity: 3    // 初速度
            } 
        },
    };

    // Positions for desktop/tablet
    const desktopPositions: { [key: string]: PositionProps } = {
        // Top row
        '1': { top: '25%', left: '10%' },
        '2': { top: '13%', left: '35%' },
        '3': { top: '18%', right: '35%' },
        '4': { top: '12%', right: '10%' },
        // Bottom row
        '5': { bottom: '24%', left: '10%' },
        '6': { bottom: '22%', left: '35%' },
        '7': { bottom: '22%', right: '35%' },
        '8': { bottom: '23%', right: '10%' },
    };

    // Positions for mobile
    const mobilePositions: { [key: string]: PositionProps } = {
        // 上段（4キャラクター）
        '1': { top: '28%', left: '2%' },
        '2': { top: '24%', left: '22%' },
        '3': { top: '29%', right: '28%' },
        '4': { top: '23%', right: '5%' },

        // 下段（4キャラクター）
        '5': { bottom: '30%', left: '0%' },
        '6': { bottom: '26%', left: '23%' },
        '7': { bottom: '26%', right: '30%' },
        '8': { bottom: '31%', right: '2%' },
    };

    const [isMobile, setIsMobile] = useState(false);

    // Detect if device is mobile based on window width
    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkIfMobile();
        window.addEventListener('resize', checkIfMobile);
        return () => window.removeEventListener('resize', checkIfMobile);
    }, []);

    return (
        <div ref={ref} className="absolute inset-0 z-20 pointer-events-none">
            {/* Characters */}
            <motion.div
                className="absolute inset-0 w-full h-full"
                variants={containerVariants}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
            >
                {/* ランダムな順序でキャラクターをマッピング */}
                {randomOrder.length > 0 && randomOrder.map((index) => {
                    const character = characters[index];
                    return (
                        <motion.div
                            key={character.id}
                            className="absolute w-28 h-28 md:w-52 md:h-52"
                            custom={index} // カスタム値を渡して個別のアニメーションをコントロール
                            variants={characterVariants}
                            style={isMobile ? mobilePositions[character.id] : desktopPositions[character.id]}
                        >
                            {/* 画像コンテナを追加して回転を適用 */}
                            <div style={{
                                width: '100%',
                                height: '100%',
                                transform: `rotate(${character.rotate}deg)`
                            }}>
                                <Image
                                    src={character.imgSrc}
                                    alt={character.alt}
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        </motion.div>
                    );
                })}
            </motion.div>
        </div>
    );
}