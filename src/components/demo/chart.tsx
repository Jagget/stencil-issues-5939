import { Build, Component, type ComponentInterface, Element, Prop, Watch, h } from '@stencil/core';
import { BarController, BarElement, CategoryScale, Chart, type ChartData, type ChartOptions, Colors, LinearScale } from 'chart.js';

@Component({
  tag: 'the-chart',
  styleUrl: 'chart.css',
  shadow: true,
})
export class BarChart implements ComponentInterface {
  /**
   * 1. Own Properties
   */
  chart: Chart<'bar'>;

  /**
   * 2. Reference to host HTML element.
   */
  @Element() el!: HTMLTheChartElement;

  /**
   * 3. State() variables
   */

  /**
   * 4. Public Property API
   */

  /**
   * Approximate width of the chart for initial rendering and for maintaining aspect ratio.
   */
  @Prop() chartWidth = 400;

  /**
   * Approximate height of the chart for initial rendering and for maintaining aspect ratio.
   */
  @Prop() chartHeight = 200;

  /**
   * Accessibility label for the canvas image.
   */
  @Prop() canvasAriaLabel = 'Bar Chart';

  /**
   * Prop lifecycle events SHOULD go just behind the Prop they listen to.
   */

  /**
   * Cart.js options for the Bar chart.
   */
  @Prop() chartOptions: ChartOptions<'bar'>;

  @Watch('chartOptions')
  onChartOptionsChange(newVal: ChartOptions<'bar'>) {
    if (this.chart) {
      this.chart.options = newVal;
      this.chart.update();
    }
  }

  /**
   * Cart.js data parameter, contains labels, datasets...
   */
  @Prop() chartData: ChartData<'bar'>;

  @Watch('chartData')
  onDisabledChange(newVal: ChartData<'bar'>) {
    if (this.chart) {
      this.chart.data = newVal;
      this.chart.update();
    }
  }

  /**
   * 5. Events section
   */

  /**
   * 6. Component lifecycle events
   */

  componentWillLoad() {
    Chart.register(BarController, BarElement, CategoryScale, LinearScale, Colors);
  }

  componentDidLoad() {
    if (Build.isServer) return;

    const ctx = this.el.shadowRoot?.querySelector('canvas') as HTMLCanvasElement;

    this.chart = new Chart<'bar'>(ctx, {
      type: 'bar',
      data: this.chartData,
      options: this.chartOptions,
    });
  }

  /**
   * 7. Listeners
   */

  /**
   * 8. Public methods API
   */

  /**
   * 9. Local methods
   */

  /**
   * 10. render() function
   */
  render() {
    return (
      <div class="chart-container" role="img" style={{ maxWidth: `${this.chartWidth}px`, maxHeight: `${this.chartHeight}px` }}>
        <canvas width={this.chartWidth} height={this.chartHeight} aria-label={this.canvasAriaLabel} />
      </div>
    );
  }
}
