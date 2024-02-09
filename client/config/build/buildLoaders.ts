import webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { BuildOptions } from './types/config';

export function buildLoaders({ isDev }: BuildOptions): webpack.RuleSetRule[] {
  const jsonLoader = {
    test: /\.json$/,
    use: 'json-loader',
  };
  const svgLoader = {
    test: /\.svg$/,
    use: ['@svgr/webpack'],
  };
  const babelLoader = {
    test: /\.(js|jsx|tsx)$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env'],
      },
    },
  };

  const cssLoader = {
    test: /\.s[ac]ss$/i,
    use: [
      isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
      {
        loader: 'css-loader',
        options: {
          modules: {
            auto: (resPath: string) => Boolean(resPath.includes('.module.')),
            localIdentName: isDev ? '[path][name]__[local]--[hash:base64:5]' : '[hash:base64:8]',
          },
        },
      },
      'sass-loader',
    ],
  };

  // Если не используем тайпскрипт - нужен babel-loader
  const typescriptLoader = {
    test: /\.(ts)x?$/,
    use: {
      loader: 'ts-loader',
      options: {
        compilerOptions: {
          noEmit: false, // this option will solve the issue
        },
      },
    },
    exclude: /node_modules|\.d\.ts$/,
  };

  const fileLoader = {
    test: /\.(png|jpe?g|gif|woff2|woff)$/i,
    use: [
      {
        loader: 'file-loader',
      },
    ],
  };

  const styleLoader = {
    test: /\.(sass|less|css)$/,
    use: ['style-loader', 'css-loader'],
  };
  return [fileLoader, svgLoader, babelLoader, typescriptLoader, styleLoader, cssLoader, jsonLoader];
}
